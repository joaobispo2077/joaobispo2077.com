---
Title: 'X-Frame-Options: How to prevent drag-and-drop style clickjacking attacks'
Author: João Bispo
Date: 2024-02-06
Tags: clickjacking-attacks, x-frame-options, security, API, webserver-apps
---

Guarding our digital apps against sneaky moves is as important as developing, and clickjacking attacks, especially through drag-and-drop actions, represent a clever trick in the hacker's playbook. These attacks can quietly compromise user interaction, turning innocent clicks into unintended actions. That's where the X-Frame-Options header comes into play, a straightforward but powerful one-line feature in our web security toolkit.

# TLDR - Securing Your App from Clickjacking Attacks

1. Is your server NOT returning HTML?
   You don't need to use the X-Frame-Options header.

2. Is your server returning HTML?
   So you must use the X-Frame-Options header to prevent clickjacking attacks.

   2.1 Don't you need to embed your page in another?
   Configure X-Frame-Options as `DENY` value.

   2.2 Do you need to embed your page in another?
   So you can't use the `DENY` value, you have to choose between `SAMEORIGIN` and `ALLOW-FROM https://example.com`.

   2.2.1 Only in the same origin?
   Configure X-Frame-Options as `SAMEORIGIN`.

   2.2.2 In any origin?
   Configure X-Frame-Options as `ALLOW-FROM https://example.com`.

3. Is your server returning raw sensitive information (like name, phone number, email and physical addresses, search history, preferences, partial credit card numbers, and more) even in JSON, XML or another data structure in a public endpoint with over permissive cors setting and without authentication?
   For precaution use the X-Frame-Options header as `DENY` value and revaluate if you really need a public endpoint without authentication returning sensitive information, probably it's not necessary.

4. Is your company trying to beat a security benchmark or get a security certification?
   Use the X-Frame-Options header with `DENY` or any suitable value to your case according the previous recommendations.

# When do the X-Frame-Options header or clickjacking attacks matter?

Only when you have a server that is returning HTML content.

If you have an API/server that is not returning HTML content, then the X-Frame-Options header is mostly not relevant. For example, if your server is returning JSON, XML, or any other non-HTML content, then the X-Frame-Options header is pointless. This header is intended to be used with HTML responses, and as such may provide little or no security benefits on an API that does not return HTML.

What can be the little security benefits for servers that do not return any HTM? If your company is trying to beat a security benchmark or get a security certification, maybe the tools used to verify the security of your application will check if the X-Frame-Options header is present in the response. If it is not present, the tool may consider it a security vulnerability even not returning HTML.

So we have to use our critical thinking here, when you are not returning HTML, mostly you don't have any security issues, but when you are returning HTML, you should use the X-Frame-Options header to prevent clickjacking attacks because you have a security issue.

# Who can face clickjacking attacks?

Anyone can face it. Imagine you're logging into your online banking website to check your account balance or make a transaction. Now, envision a scenario where, unbeknownst to you, a hacker has overlaid an invisible frame over the entire webpage. This frame is a part of a malicious website controlled by the hacker, but you can't see it because it's transparent.

In a drag-and-drop clickjacking attack, you might think you're dragging a file, like a PDF of your bank statement or any other file with sensitive data, to upload it to your trustable website. However, because of the invisible layer, you're actually dragging and dropping your file into a hidden area set up by the attacker. As a result, you might inadvertently upload sensitive information, such as personal financial details, directly to the hacker's site without realizing it.

This situation is akin to using an ATM where a fraudster has cleverly placed a fake keypad overlay on the real one. You think you're entering your PIN on the bank's machine, but you're actually entering it on the fraudster's device.

# What are the ways that attackers can use clickjacking attacks?

They will need 3 steps to perform a clickjacking attack:

1. Creating a malicious website and Layering with an Iframe: The core technique involves using an `<iframe>` HTML element, which can display content from another website within the current page. The attacker places this iframe on their malicious webpage but points it to a legitimate site that the victim trusts, like a financial institution or social media platform.

2. Making the Iframe Invisible: To hide their trickery, the hacker sets the iframe to be transparent or so small and positioned under a seemingly harmless element on the page (like a button, input or an image) that the victim intends to interact with. CSS (Cascading Style Sheets) and JavaScript are used to manipulate the appearance and behavior of the iframe, making the overlay invisible or deceptive.

3. Tricking the User: The attacker then lures the victim to the malicious webpage through phishing emails, social media messages, or other means. The message might promise a reward, require action for account security, or invoke urgency to compel the user to visit the site. Once on the malicious webpage, the victim is tricked into performing an action like clicking a button, dragging, and dropping a file, or other gestures. Because of the transparent iframe overlaying the legitimate content, these actions are redirected to the attacker's site or cause unintended interactions with the legitimate site but under the attacker's control.

# Why would attackers do this?

It's a lazy attack because the attacker does not need to do something like cloning all the website using HTML and CSS, so it's easier to do it. Depending on the nature of the overlay and the intended action, this could result in sensitive information being sent to the attacker, account settings being changed without the user's knowledge, or other malicious outcomes.

# How can we prevent it?

As this attack does not depend solely and exclusively on a technical breach, but on the user interacting with a fake page that is using content from a real one. Two fronts can be worked on, the first would be to guide users to always check the domain they are accessing and the second would be to insert the "X-Frame-Options" header with the appropriate value in your application.

# Where should the developer/Ops/Security team configure the X-Frame-Options

Depending on the tool you are using, the way you can configure the `X-frame-Options header` will vary, I will leave 3 different examples here, one at the proxy level, another at the application level, and the final at the infra level:

1. [Nginx add header sample](https://nginx.org/en/docs/http/ngx_http_headers_module.html):

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
```

2. [Next.js sample](https://nextjs.org/docs/pages/api-reference/next-config-js/headers#x-frame-options):

File: next.config.js

```js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)?', // Matches all pages
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};
```

3. [Cloudfrount sample](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-responseheaderspolicy-frameoptions.html):

Resource: AWS::CloudFront::ResponseHeadersPolicy
Pattern value supported: ^(DENY|SAMEORIGIN)$

```
{
  "FrameOption" : "DENY",
  "Override" : true
}
```

If the tool/framework/infra/proxy that you're using is not one of above, you can search for the documentation of the tool you are using and look for the `X-Frame-Options` header configuration.

# Extra - Gotcha/Captcha attack

This kind of phishing can reach a whole new level, using X-Frame-Options breach into a different attack than clickjacking, especially when you have a "GET" method in a public endpoint returning sensitive or partial senstive information with over permissive cors setting and without authentication.

The fake Captcha attack also known as a Gotcha attack can use several Iframe's to render in a scrambled way part of the information that its endpoint is returned and as a double factor fake, the malicious page can ask the user to fill in the rest of the information and thus steal private user data.

Imagine you have an API/server that returns part of the user's physical address like "Manhattan, NY 10XXXXX, United States", and using a bunch of iframe like the below one, the malicious attacker can render this in a captcha way and ask the user to fill in the rest of the information like the street, number, and zip code.

```html
<iframe src=”//[some-hostname].com/api/reveal-address/”></iframe>
```

So when the user completes the information like "Manhattan, NY 10036123, United States" (I typed a random address) the malicious page can steal the user's address and use it to perform a social engineering attack.

Again, this kind of attack depends on the user interacting with a fake page that is using content from a real one, so the same prevention measures can be used here, guide users to always check the domain they are accessing and insert the "X-Frame-Options" header with the appropriate value in your application, but in this special case, I rather prefer to do not have any public GET endpoint returning sensitive or partial sensitive information.

# References

- Helme, Scott. Hardening your HTTP response headers, 2015. Available at: https://scotthelme.co.uk/hardening-your-http-response-headers/. Accessed on February 06, 2024.
- OWASP. OWASP Secure Headers Project, 2019. Available at:
  https://owasp.org/www-project-secure-headers/#x-frame-options. Accessed on February 06, 2024.
- De Ceukelaire, Inti. GOTCHA: Taking phishing to a whole new level, 2019. Available at: https://medium.com/intigriti/gotcha-taking-phishing-to-a-whole-new-level-72eda9e30bef. Accessed on February 09, 2024.
- Herzberg, Amir. Tell Me About Yourself: The Malicious CAPTCHA Attack, 2016. Available at: https://www.researchgate.net/publication/288280540_Tell_Me_About_Yourself_The_Malicious_CAPTCHA_Attack. Accessed on February 09, 2024
