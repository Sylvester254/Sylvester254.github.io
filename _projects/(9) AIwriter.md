---
name: AI Writer - Chrome Extension
tools: [JavaScript, Flask, Stripe API, GPT-3 API, Google OAuth]
image: /images/extension/img4.png
description: AI Writer is a powerful Chrome extension designed to enhance your writing experience.
---

<h1 style="font-family: Georgia;">AI Writer - Chrome Extension</h1>

---

## Overview

AI Writer is a powerful Chrome extension designed to enhance your writing experience. It leverages advanced GPT-3 models to autocorrect text, fix grammar errors, and adjust the tone of your text on-the-fly. The extension also offers premium features accessible through a subscription model, ensuring a seamless and enriched user experience.

---

![preview](/images/extension/aiwriter01.png)

## Features

### 1. **Text Correction and Enhancement**
   - **Autocorrect:** AI Writer automatically corrects spelling and typographical errors in your text.
   - **Grammar Fix:** The extension identifies and corrects grammatical mistakes.
   - **Tone Adjustment:** AI Writer can adjust the tone of your text to suit your desired communication style.

### 2. **User Authentication**
   - **Google OAuth:** Users can sign up and authenticate themselves using their Google accounts, ensuring a secure and convenient login process.

### 3. **Premium Subscriptions**
   - **Stripe Payments:** Users can opt for premium subscriptions using Stripe payments to unlock additional features.
   - **Usage Monitoring:** The extension monitors the usage of premium features.

### 4. **Server-Side Operations**
   - **User Management:** The Flask application in the `serverSide` directory handles user authentication and payment processing.
   - **Access Control:** Determines the level of access granted to a user based on their subscription status.

## Usage

AI Writer can be added as a Chrome extension. Once installed, users can sign up using Google OAuth and opt for premium subscriptions if desired. The extension will automatically enhance the writing experience by correcting and improving the text in real-time.

![preview](/images/extension/aiwriter02.png)

![preview](/images/extension/img4.png)

## Conclusion

AI Writer is an all-encompassing solution for individuals seeking to improve their written communication. By offering features like autocorrection, grammar fixing, and tone adjustment, it ensures that your writing is always at its best.

