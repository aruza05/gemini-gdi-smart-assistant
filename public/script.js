const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const submitButton = form.querySelector('button[type="submit"]');

// Store conversation history matching backend expectations:
// Array of { role: "user" | "model", text: string }
const conversation = [];

// Determine API URL: fallback to localhost:3000 if opened directly via file:// or another port/domain
const API_URL = (window.location.protocol === 'file:' || !window.location.host.includes('3000'))
  ? 'http://localhost:3000/api/chat'
  : '/api/chat';

/**
 * Helper to escape HTML characters to prevent XSS.
 * @param {string} text 
 * @returns {string}
 */
function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Helper to convert basic Markdown syntax to safe HTML.
 * Supports:
 * - Newline to <br>
 * - **bold** to <strong>bold</strong>
 * - Bullet list (- , * , • ) to <ul><li>list items</li></ul>
 * @param {string} text 
 * @returns {string}
 */
function formatMarkdown(text) {
  // First, escape HTML to ensure safety
  let escaped = escapeHTML(text);

  // Parse bold tags: **text** -> <strong>text</strong>
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Parse lists line by line
  const lines = escaped.split('\n');
  let inList = false;
  const processedLines = [];

  for (let line of lines) {
    const trimmed = line.trim();
    // Match line starting with dash, asterisk, or bullet
    const listMatch = trimmed.match(/^[-*•]\s+(.*)/);
    if (listMatch) {
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      processedLines.push(`<li>${listMatch[1]}</li>`);
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push(line);
    }
  }
  if (inList) {
    processedLines.push('</ul>');
  }

  // Join lines back together, converting non-list newlines to <br>
  let finalHtml = '';
  for (let i = 0; i < processedLines.length; i++) {
    const line = processedLines[i];
    if (line === '<ul>' || line === '</ul>' || line.startsWith('<li>')) {
      finalHtml += line;
    } else {
      finalHtml += line + (i < processedLines.length - 1 ? '<br>' : '');
    }
  }

  return finalHtml;
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // 1. Add the user's message to the chat box DOM
  appendMessage('user', userMessage);
  
  // 2. Add to conversation history using correct roles for Gemini API
  conversation.push({ role: 'user', text: userMessage });

  // Clear the input field
  input.value = '';

  // 3. Show a temporary loading bubble with three-dot animation
  const thinkingMessageElement = appendMessage('bot', '');
  thinkingMessageElement.classList.add('loading-bubble');
  thinkingMessageElement.innerHTML = `
    <div class="dot-loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  // Disable inputs to prevent double submissions
  setLoadingState(true);

  try {
    // 4. Send the user's message as a POST request to /api/chat
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ conversation })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Remove loading classes/loader markup
    thinkingMessageElement.classList.remove('loading-bubble');

    // 5. Replace loader with the formatted AI reply
    if (data && data.result) {
      thinkingMessageElement.innerHTML = formatMarkdown(data.result);
      // Add model's response to history
      conversation.push({ role: 'model', text: data.result });
    } else {
      throw new Error('Sorry, no response received.');
    }

  } catch (error) {
    console.error('Error fetching chat response:', error);
    
    // Remove the user's last message from history since the backend didn't successfully process it
    if (conversation.length > 0 && conversation[conversation.length - 1].role === 'user') {
      conversation.pop();
    }

    // Remove loading classes/loader markup
    thinkingMessageElement.classList.remove('loading-bubble');

    // 6. Show clear error message
    thinkingMessageElement.textContent = 'Failed to get response from server.';
    thinkingMessageElement.style.color = '#dc3545';
  } finally {
    // Re-enable inputs
    setLoadingState(false);
  }
});

/**
 * Helper to append a message to the chat box DOM.
 * @param {string} sender - 'user' or 'bot' (matches CSS styles)
 * @param {string} text - message text
 * @returns {HTMLElement} - The created message element
 */
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);

  // Add a clear element to fix CSS float wrapping issues
  const clear = document.createElement('div');
  clear.style.clear = 'both';
  chatBox.appendChild(clear);

  // Scroll to the bottom of the chat box
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

/**
 * Helper to toggle UI loading state
 * @param {boolean} isLoading 
 */
function setLoadingState(isLoading) {
  input.disabled = isLoading;
  if (submitButton) {
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? 'Sending...' : 'Send';
  }
}
