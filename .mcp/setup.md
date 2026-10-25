# Razorpay MCP Server Setup for Bihar Fashion League

This document explains how to integrate the Razorpay Remote MCP Server with your AI assistant for the BFL project.

## Overview

The Razorpay MCP Server allows your AI assistant (Claude Desktop, Cursor, VS Code, etc.) to interact with Razorpay APIs using natural language commands. This is useful for:

- Checking payment status for BFL registration applications
- Creating refunds for cancelled registrations
- Generating payment links for manual payments
- Viewing webhook events and payment events
- Managing Razorpay account settings

## Prerequisites

1. **Node.js** installed (LTS version)
2. **Razorpay Account** with API access
3. **Razorpay API Keys** (Key ID and Key Secret) from the [Dashboard](https://dashboard.razorpay.com/)

## Step 1: Generate Razorpay API Keys

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to **Account & Settings** → **API Keys**
3. Generate your API keys (Key ID and Key Secret)
4. Copy both values

## Step 2: Create Merchant Token

Encode your credentials as base64:

```bash
echo "<RAZORPAY_API_KEY>:<RAZORPAY_API_SECRET>" | base64
```

Example output:
```
cnpwX3Rlc3RfYWJjMTIzOnNlY3JldF9kZWY0NTY=
```

Save this value — you'll need it for configuration.

## Step 3: Configure Your AI Assistant

### Claude Desktop

Add to `~/.claude.json` (macOS/Linux) or `%APPDATA%\Claude\claude.json` (Windows):

```json
{
  "mcpServers": {
    "razorpay": {
      "command": "npx",
      "args": ["-y", "@razorpay/mcp-remote"],
      "env": {
        "RAZORPAY_MCP_ENDPOINT": "https://mcp.razorpay.com/mcp",
        "RAZORPAY_MERCHANT_TOKEN": "<BASE64_ENCODED_TOKEN>",
        "RAZORPAY_API_KEY": "<YOUR_KEY_ID>",
        "RAZORPAY_API_SECRET": "<YOUR_KEY_SECRET>"
      }
    }
  }
}
```

### Cursor

Add to your Cursor settings (mcp.json in project root or global settings):

```json
{
  "mcpServers": {
    "razorpay": {
      "command": "npx",
      "args": ["-y", "@razorpay/mcp-remote"],
      "env": {
        "RAZORPAY_MCP_ENDPOINT": "https://mcp.razorpay.com/mcp",
        "RAZORPAY_MERCHANT_TOKEN": "<BASE64_ENCODED_TOKEN>",
        "RAZORPAY_API_KEY": "<YOUR_KEY_ID>",
        "RAZORPAY_API_SECRET": "<YOUR_KEY_SECRET>"
      }
    }
  }
}
```

### VS Code (Agent Mode)

Add to your VS Code settings or `.vscode/mcp.json`:

```json
{
  "mcpServers": {
    "razorpay": {
      "command": "npx",
      "args": ["-y", "@razorpay/mcp-remote"],
      "env": {
        "RAZORPAY_MCP_ENDPOINT": "https://mcp.razorpay.com/mcp",
        "RAZORPAY_MERCHANT_TOKEN": "<BASE64_ENCODED_TOKEN>",
        "RAZORPAY_API_KEY": "<YOUR_KEY_ID>",
        "RAZORPAY_API_SECRET": "<YOUR_KEY_SECRET>"
      }
    }
  }
}
```

### Gemini CLI

Add to your Gemini CLI settings.json:

```json
{
  "mcpServers": {
    "razorpay": {
      "command": "npx",
      "args": ["-y", "@razorpay/mcp-remote"],
      "env": {
        "RAZORPAY_MCP_ENDPOINT": "https://mcp.razorpay.com/mcp",
        "RAZORPAY_MERCHANT_TOKEN": "<BASE64_ENCODED_TOKEN>",
        "RAZORPAY_API_KEY": "<YOUR_KEY_ID>",
        "RAZORPAY_API_SECRET": "<YOUR_KEY_SECRET>"
      }
    }
  }
}
```

## Step 4: Restart Your AI Assistant

Restart your AI assistant application after adding the configuration. The Razorpay MCP tools should become available.

Test by asking:
> "Show me available Razorpay tools"

## Step 6: Test with BFL

Once connected, try these BFL-specific queries:

- "Show me all Razorpay orders for Bihar Fashion League"
- "Check payment status for order [order_id]"
- "Create a refund for payment [payment_id]"
- "List recent payment events"
- "Create a payment link for ₹3000 registration fee"

## Project Files

- `.mcp/razorpay.json` - Base MCP configuration template
- `.env.local` - Add your Razorpay credentials here:
  ```
  RAZORPAY_KEY_ID=your_key_id
  RAZORPAY_KEY_SECRET=your_key_secret
  RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
  ```

## Security Notes

- **Never commit API keys to Git** — they are already in `.gitignore`
- The merchant token is base64-encoded, **not encrypted** — treat it like a password
- Use test mode keys for development, live keys only in production
- Rotate keys if you suspect compromise

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MCP server not connecting | Verify Node.js and npm are installed |
| Authentication failed | Check API key/secret are correct |
| Tools not appearing | Restart your AI assistant |
| Webhook events not showing | Verify webhook is configured in Razorpay Dashboard |

## Next Steps

1. Explore [Razorpay MCP Tools Reference](https://razorpay.com/docs/mcp-server/tools-reference.md)
2. Review [MCP Use Cases](https://razorpay.com/docs/mcp-server/use-cases.md)
3. Configure [webhook endpoints](https://dashboard.razorpay.com/) for payment events
