---
title: 'Web Accessibility: Building Sites That Work for Everyone'
description: 'A practical guide to web accessibility covering WCAG compliance, semantic HTML, ARIA, keyboard navigation, screen readers, colour contrast, and testing tools for inclusive web design.'
heading: 'Web Accessibility: Building Sites That Work for Everyone'
category: 'Web Development'
categorySlug: 'web-development'
published: 2026-04-10
modified: 2026-04-12
readingTime: '14 min read'
excerpt: 'Practical WCAG compliance covering ARIA attributes, keyboard navigation, color contrast, screen reader support, and the testing tools to verify it all.'
emoji: '♿'
displayDate: 'April 10, 2026'
related:
  - 'mobile-first-web-design'
  - 'core-web-vitals-guide'
  - 'website-speed-optimization'
speakable:
  - '.article-intro'
toc:
  - id: 'understanding-wcag-and-compliance-levels'
    text: 'Understanding WCAG and Compliance Levels'
  - id: 'semantic-html-the-foundation-of-accessibility'
    text: 'Semantic HTML: The Foundation of Accessibility'
  - id: 'keyboard-navigation'
    text: 'Keyboard Navigation'
  - id: 'colour-contrast-and-visual-design'
    text: 'Colour Contrast and Visual Design'
  - id: 'images-and-media-accessibility'
    text: 'Images and Media Accessibility'
  - id: 'forms-and-interactive-elements'
    text: 'Forms and Interactive Elements'
  - id: 'aria-when-and-how-to-use-it'
    text: 'ARIA: When and How to Use It'
  - id: 'testing-methodology-and-tools'
    text: 'Testing Methodology and Tools'
  - id: 'accessibility-and-seo-the-overlap'
    text: 'Accessibility and SEO: The Overlap'
  - id: 'building-accessibility-into-your-workflow'
    text: 'Building Accessibility into Your Workflow'
  - id: 'common-accessibility-mistakes-and-fixes'
    text: 'Common Accessibility Mistakes and Fixes'
  - id: 'frequently-asked-questions'
    text: 'Frequently Asked Questions'
faqs:
  - q: 'What is WCAG and which level should I aim for?'
    a: 'WCAG stands for Web Content Accessibility Guidelines, published by the W3C. It has three conformance levels: A (minimum), AA (recommended), and AAA (highest). Most organisations should aim for WCAG 2.2 Level AA, which is the standard referenced by most accessibility laws worldwide including the European Accessibility Act and ADA requirements in the United States. Level AA covers the most impactful accessibility requirements without being prohibitively difficult to implement. Level AAA is aspirational and includes stricter requirements like 7:1 colour contrast ratios that may conflict with brand guidelines. I recommend targeting AA as the baseline and implementing AAA criteria where practical.'
  - q: 'Does web accessibility affect SEO?'
    a: 'Yes, web accessibility and SEO overlap significantly. Semantic HTML helps both screen readers and search engine crawlers understand your content structure. Alt text on images serves screen reader users and gives search engines context about image content. Proper heading hierarchy aids both navigation for screen reader users and content understanding for search algorithms. Page speed improvements benefit both accessibility and Core Web Vitals scores. Good link text helps screen reader users understand link destinations and provides keyword-rich anchor text for SEO. In my experience, fixing accessibility issues on a website almost always improves its SEO performance as a beneficial side effect.'
  - q: 'How do I test my website for accessibility?'
    a: 'I use a layered testing approach. Automated tools like axe DevTools, WAVE, and Lighthouse catch approximately 30 to 40 percent of accessibility issues - mainly technical violations like missing alt text, insufficient contrast, and incorrect ARIA usage. Manual testing covers the rest: navigate the entire site using only a keyboard, test with a screen reader like NVDA or VoiceOver, check colour contrast with a tool like Colour Contrast Analyser, and verify that all interactive elements are properly labelled. For comprehensive coverage, combine automated scans with manual keyboard testing, screen reader testing, and ideally user testing with people who have disabilities.'
  - q: 'Are accessibility overlays and widgets effective?'
    a: 'No, accessibility overlay widgets are not an effective solution and I strongly advise against them. These tools add a JavaScript widget to your site that claims to fix accessibility issues automatically, but they cannot address fundamental structural problems like missing semantic HTML, incorrect heading hierarchy, or poor keyboard navigation. Many disability advocacy organisations have publicly opposed overlays because they often interfere with the assistive technologies users already rely on. Some overlays have even been the subject of accessibility lawsuits themselves. The only reliable path to accessibility is building it into your site''s HTML, CSS, and JavaScript from the start.'
  - q: 'How much does it cost to make a website accessible?'
    a: 'The cost varies enormously depending on the size and complexity of your site and how far it currently is from compliance. For a new website, building accessibility in from the start adds roughly 10 to 15 percent to development time - a modest investment that avoids expensive retrofitting later. For existing sites, a basic accessibility remediation of a small business website typically costs between 2,000 and 10,000 USD depending on the severity of issues. Large enterprise sites can cost significantly more. The most cost-effective approach is to integrate accessibility into your standard development workflow so that every new page and feature is built accessibly from day one, rather than treating it as a separate remediation project.'
---

<p class="article-intro">About 16 percent of the world's population lives with some form of disability. In India alone, the 2011 Census counted over 26 million people with disabilities, and the actual number is almost certainly higher. When you build a website that is not accessible, you are not just failing a compliance checkbox -- you are actively excluding millions of potential users, customers, and community members from accessing your content and services. <strong>Web accessibility</strong> means designing and building websites that can be used by everyone, including people who navigate with keyboards, use screen readers, have low vision, are colour blind, have motor impairments, or experience cognitive disabilities.</p>

<p>I will be honest -- when I started building websites two and a half years ago, accessibility was something I treated as an afterthought. I would build the site, then run a Lighthouse audit and fix whatever it flagged. That approach is inadequate. Automated tools catch less than half of real accessibility issues. The shift in my practice came when I watched a screen reader user try to navigate a site I had built and realised how many barriers I had unknowingly created. Since then, I have integrated accessibility into every stage of my design and development process, and the results have been better for everyone -- not just users with disabilities. Accessible sites are faster, more usable, better structured for SEO, and more maintainable. This guide covers everything I have learned about building truly accessible websites.</p>

<h2 id="understanding-wcag-and-compliance-levels">Understanding WCAG and Compliance Levels</h2>

<p>The Web Content Accessibility Guidelines (WCAG) are the international standard for web accessibility. Published by the World Wide Web Consortium (W3C), WCAG provides testable criteria organised around four principles known by the acronym POUR: Perceivable, Operable, Understandable, and Robust.</p>

<p><strong>Perceivable</strong> means that all information and user interface components must be presentable to users in ways they can perceive. A user who cannot see images needs alt text. A user who cannot hear audio needs captions. A user with low vision needs sufficient colour contrast. The content must be available through multiple sensory channels, not just one.</p>

<p><strong>Operable</strong> means that all interface components and navigation must be operable by all users. If a sighted mouse user can click a button, a keyboard user must be able to activate it too. If a feature requires precise mouse movements, there must be an alternative for users with motor impairments. Time limits must be adjustable. Content that flashes must not trigger seizures.</p>

<p><strong>Understandable</strong> means that the information and the operation of the user interface must be understandable. The language must be readable and predictable. Error messages must explain what went wrong and how to fix it. Navigation must be consistent across pages. Form inputs must have clear labels and instructions.</p>

<p><strong>Robust</strong> means that content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies. This means using valid, semantic HTML, proper ARIA attributes when needed, and ensuring compatibility with current and future technologies.</p>

<p>WCAG defines three conformance levels. <strong>Level A</strong> is the minimum -- it covers the most basic accessibility requirements like alt text for images and keyboard accessibility for all interactive elements. <strong>Level AA</strong> is what most laws and regulations require, and what I target for all my projects. It includes everything in Level A plus requirements like 4.5:1 colour contrast for normal text, visible focus indicators, and multiple navigation methods. <strong>Level AAA</strong> is the highest level and includes stricter requirements that are not always achievable for all content types. I implement AAA criteria where practical but do not make it a blanket target.</p>

<h2 id="semantic-html-the-foundation-of-accessibility">Semantic HTML: The Foundation of Accessibility</h2>

<p>The single most impactful thing you can do for accessibility is write proper semantic HTML. Screen readers and other assistive technologies rely on HTML semantics to convey the structure and meaning of your content. When you use a <code>&lt;div&gt;</code> where you should use a <code>&lt;button&gt;</code>, you strip away the meaning that assistive technology needs to communicate with its users.</p>

<p><strong>Landmark elements.</strong> HTML5 landmark elements -- <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code> -- create a structural map of your page that screen reader users can navigate quickly. A screen reader user can jump directly from the navigation to the main content, or skip to the footer, without reading through every element on the page. I use these landmarks on every page I build. A typical page structure has a <code>&lt;header&gt;</code> containing the navigation, a <code>&lt;main&gt;</code> containing the primary content, possibly an <code>&lt;aside&gt;</code> for secondary content, and a <code>&lt;footer&gt;</code> at the bottom.</p>

<p><strong>Heading hierarchy.</strong> Headings (<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>) must form a logical hierarchy without skipping levels. Screen reader users frequently navigate pages by jumping between headings, so the heading structure essentially serves as a table of contents for the page. Every page should have exactly one <code>&lt;h1&gt;</code>. Section headings should be <code>&lt;h2&gt;</code>, subsections should be <code>&lt;h3&gt;</code>, and so on. Never choose a heading level based on visual size -- use CSS to control the visual appearance and HTML to control the semantic meaning.</p>

<p><strong>Buttons versus links.</strong> This is one of the most common accessibility errors I encounter. Links (<code>&lt;a&gt;</code>) navigate the user to a new page or a location within the current page. Buttons (<code>&lt;button&gt;</code>) perform an action like opening a menu, submitting a form, or toggling a state. Using a <code>&lt;div&gt;</code> with an <code>onclick</code> handler instead of a proper <code>&lt;button&gt;</code> element means keyboard users cannot activate it, screen readers do not announce it as interactive, and it does not receive focus by default. Use the right element for the job, and most accessibility problems solve themselves.</p>

<p><strong>Lists for lists.</strong> When you have a list of items -- navigation links, feature lists, step-by-step processes -- use <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, or <code>&lt;dl&gt;</code> elements. Screen readers announce lists and tell users how many items they contain, which provides valuable context. A navigation menu built with <code>&lt;div&gt;</code> elements and styled to look like a list loses this information entirely.</p>

<h2 id="keyboard-navigation">Keyboard Navigation</h2>

<p>Approximately 2 to 3 percent of web users navigate primarily with a keyboard -- either because of motor impairments that prevent mouse use, because they use assistive devices that emulate keyboard input, or simply because they prefer keyboard efficiency. Every interactive element on your site must be fully functional using only the keyboard.</p>

<p><strong>Tab order.</strong> Pressing the Tab key should move focus through interactive elements in a logical order that matches the visual layout. The natural tab order follows the DOM order, so if your HTML is structured logically, the tab order will be correct by default. Problems arise when CSS is used to visually reorder elements (using <code>order</code> in Flexbox or Grid, or <code>position: absolute</code>) without adjusting the DOM order. I always test tab order by pressing Tab through the entire page and verifying that focus moves in a logical, predictable sequence.</p>

<p><strong>Focus indicators.</strong> When an element receives keyboard focus, it must have a visible focus indicator -- typically an outline around the element. The default browser focus ring is functional but often thin and hard to see. I style custom focus indicators using <code>:focus-visible</code> (which only shows the indicator for keyboard users, not mouse clicks) with a prominent outline: <code>outline: 3px solid var(--accent-primary); outline-offset: 2px;</code>. Never remove focus indicators with <code>outline: none</code> without providing a visible alternative. This is one of the most harmful accessibility practices I encounter, and it is depressingly common.</p>

<p><strong>Skip links.</strong> The first interactive element on every page should be a "Skip to content" link that allows keyboard users to bypass the navigation and jump directly to the main content. Without a skip link, a keyboard user has to tab through every navigation link on every page before reaching the content. I implement skip links as visually hidden elements that become visible when focused -- so they do not affect the visual design for mouse users but are immediately available for keyboard users.</p>

<p><strong>Focus trapping for modals.</strong> When a modal dialog opens, keyboard focus must be trapped within the modal. This means Tab should cycle through the modal's interactive elements without ever reaching elements behind the modal. When the modal closes, focus should return to the element that triggered it. I implement this with JavaScript that monitors keydown events within modal containers and programmatically manages focus.</p>

<h2 id="colour-contrast-and-visual-design">Colour Contrast and Visual Design</h2>

<p>Colour-related accessibility issues are the most common category of WCAG failures. They are also among the easiest to fix, which makes it frustrating how often I see them on live websites.</p>

<p><strong>Contrast ratios.</strong> WCAG AA requires a contrast ratio of at least 4.5:1 for normal text (under 18 points or 14 points bold) and 3:1 for large text (18 points and above, or 14 points bold and above). I use the WebAIM Contrast Checker to verify every text-background colour combination on a page. Common failures include light grey text on a white background, coloured text on coloured backgrounds, and placeholder text in form inputs (which is almost always below contrast requirements). I design with contrast requirements as hard constraints -- if a colour combination does not meet 4.5:1, I adjust it before moving forward.</p>

<p><strong>Do not rely on colour alone.</strong> Information conveyed through colour must also be available through another visual channel. Error states should not just turn the input border red -- they should also include an error icon and text explanation. Chart data should not only use different colours for different datasets -- it should also use different patterns or labels. Links within body text should not be distinguished from surrounding text by colour alone -- they should also be underlined or have some other visual treatment. Approximately 8 percent of men and 0.5 percent of women have some form of colour vision deficiency, which means relying on colour alone excludes a significant portion of your users.</p>

<p><strong>Dark mode accessibility.</strong> Implementing a dark mode is not just a visual preference -- it is an accessibility feature for users with light sensitivity, migraine conditions, and certain visual impairments. When building dark mode, I ensure that all contrast ratios meet WCAG standards in both modes, images and icons remain visible against dark backgrounds, and focus indicators are visible in both themes. I test both modes separately because a colour combination that passes in light mode might fail in dark mode or vice versa.</p>

<p><strong>Text over images.</strong> Text placed over background images is almost always an accessibility problem because the contrast ratio varies depending on which part of the image the text overlaps. I use semi-transparent overlays behind text that sits over images to guarantee sufficient contrast. The overlay colour and opacity are calibrated to ensure the text meets WCAG AA contrast requirements against the lightest or darkest relevant area of the image.</p>

<h2 id="images-and-media-accessibility">Images and Media Accessibility</h2>

<p>Images and media are among the most common sources of accessibility barriers. A screen reader cannot describe an image on its own -- it relies entirely on the information you provide through alt text and other markup.</p>

<p><strong>Alt text that works.</strong> Every informative image needs an <code>alt</code> attribute that describes the content and purpose of the image. The alt text should convey what the image communicates, not just what it looks like. For a photo of a team celebrating a project launch, "Team celebrating the successful launch of the Acme redesign project" is better than "Photo of people smiling." For decorative images that add no information -- background textures, visual separators, purely aesthetic graphics -- use an empty <code>alt=""</code> attribute so screen readers skip them entirely. Never omit the <code>alt</code> attribute altogether, because screen readers will then read the file name, which is almost always unhelpful.</p>

<p><strong>Complex images.</strong> Charts, graphs, infographics, and diagrams need more than a simple alt attribute. I use a combination of a brief alt text summary and either a detailed description in the surrounding text or a <code>longdesc</code> attribute pointing to a detailed text alternative. For a bar chart showing quarterly revenue, the alt text might be "Bar chart showing quarterly revenue growth from Q1 to Q4 2025," while the surrounding text includes the actual numbers that the chart visualises.</p>

<p><strong>Video captions and transcripts.</strong> All video content needs captions -- not auto-generated captions, which are frequently inaccurate, but reviewed and corrected captions. Pre-recorded audio content needs transcripts. Live video content needs real-time captions. I recommend using YouTube or Vimeo's built-in captioning tools as a starting point, but always reviewing and editing the auto-generated captions for accuracy. For critical content like tutorials or product demonstrations, I also provide full text transcripts that can be read independently of the video.</p>

<p><strong>Audio descriptions.</strong> Videos that convey important information visually -- demonstrations, tutorials with visual steps, presentations with visual aids -- should ideally have audio descriptions that narrate the visual content for blind users. This is a WCAG AA requirement that is often overlooked. At minimum, ensure that any information conveyed only visually in a video is also communicated verbally or in accompanying text.</p>

<h2 id="forms-and-interactive-elements">Forms and Interactive Elements</h2>

<p>Forms are the primary conversion mechanism on most websites, and they are also one of the most common sources of accessibility failures. An inaccessible form is a form that some of your users literally cannot complete -- which means you are losing conversions from people who wanted to give you their business.</p>

<p><strong>Labels for every input.</strong> Every form input must have a visible, associated <code>&lt;label&gt;</code> element. The label is connected to the input using the <code>for</code> attribute matching the input's <code>id</code>. Placeholder text is not a substitute for labels -- it disappears when the user starts typing, it typically has insufficient contrast, and some screen readers do not announce it. I use visible labels above every input, with placeholder text only as supplementary guidance like "e.g., john@example.com."</p>

<p><strong>Error handling.</strong> When a form submission fails validation, the errors must be communicated clearly to all users. I implement error messages that appear adjacent to the relevant field, use <code>role="alert"</code> or <code>aria-live="assertive"</code> so screen readers announce them immediately, include specific instructions for fixing the error, and use both colour and an icon to indicate the error state. I also move focus to the first error field so the user does not have to search for what went wrong.</p>

<p><strong>Required fields.</strong> Required fields must be clearly indicated. I use both a visual indicator (an asterisk or the word "Required") and the <code>required</code> HTML attribute or <code>aria-required="true"</code>. Relying only on the asterisk convention is problematic because not all users understand what it means and screen readers may not announce it unless it has appropriate alt text or aria-label.</p>

<p><strong>Custom interactive components.</strong> Dropdowns, date pickers, toggle switches, accordions, tabs, and other custom components need careful attention to keyboard accessibility and screen reader compatibility. I follow the WAI-ARIA Authoring Practices patterns which define the expected keyboard behaviour and ARIA roles for common widget types. For example, a tab panel should use <code>role="tablist"</code>, <code>role="tab"</code>, and <code>role="tabpanel"</code>, with arrow keys to navigate between tabs and Enter to activate them. Getting these patterns right is essential for screen reader users to understand and interact with custom widgets.</p>

<h2 id="aria-when-and-how-to-use-it">ARIA: When and How to Use It</h2>

<p>ARIA (Accessible Rich Internet Applications) attributes add accessibility information to HTML elements. They are powerful but frequently misused. The first rule of ARIA is: do not use ARIA if native HTML can accomplish the same thing. A <code>&lt;button&gt;</code> element does not need <code>role="button"</code> -- it already has that role built in.</p>

<p><strong>When ARIA is necessary.</strong> ARIA is needed when you are building custom interactive components that have no native HTML equivalent, when you need to communicate dynamic state changes to screen readers, and when you need to establish relationships between elements that are not apparent from the DOM structure. Common legitimate uses include <code>aria-expanded</code> on buttons that toggle accordion panels, <code>aria-label</code> on icon-only buttons that have no visible text, <code>aria-live</code> regions for dynamic content updates, and <code>aria-describedby</code> to associate help text with form inputs.</p>

<p><strong>Common ARIA mistakes.</strong> The most frequent ARIA error I see is adding <code>role</code> attributes to elements that already have the correct native role. Adding <code>role="navigation"</code> to a <code>&lt;nav&gt;</code> element is redundant. Adding <code>role="button"</code> to a <code>&lt;div&gt;</code> makes screen readers announce it as a button, but it does not make it keyboard-focusable or activatable with Enter/Space -- you still need <code>tabindex="0"</code> and keyboard event handlers, which is why you should just use a <code>&lt;button&gt;</code> in the first place.</p>

<p><strong>Live regions.</strong> When content on the page updates dynamically without a page reload -- a notification appearing, a search results list updating, a form error displaying -- screen readers need to be told about the change. <code>aria-live="polite"</code> announces the change after the user's current activity, while <code>aria-live="assertive"</code> interrupts the current activity to announce the change immediately. I use <code>polite</code> for most dynamic content updates and <code>assertive</code> only for urgent notifications like error messages.</p>

<h2 id="testing-methodology-and-tools">Testing Methodology and Tools</h2>

<p>Accessibility testing requires a combination of automated scanning, manual testing, and assistive technology testing. No single approach catches everything.</p>

<p><strong>Automated testing.</strong> I run axe DevTools (a browser extension) on every page during development. It catches technical violations like missing alt text, insufficient colour contrast, missing form labels, and invalid ARIA usage. I also include axe-core in my CI/CD pipeline to prevent accessibility regressions from reaching production. Lighthouse provides a good accessibility score but is less thorough than axe. WAVE (Web Accessibility Evaluation Tool) provides a visual overlay that shows accessibility issues directly on the page. I use all three because each catches slightly different issues.</p>

<p><strong>Manual keyboard testing.</strong> I tab through every page and verify that all interactive elements receive focus in a logical order, focus indicators are clearly visible, all functionality is available without a mouse, modals trap focus correctly, and skip links work properly. This takes 5 to 10 minutes per page and catches issues that automated tools completely miss -- particularly focus order problems caused by CSS reordering and custom interactive components with incomplete keyboard support.</p>

<p><strong>Screen reader testing.</strong> I test with NVDA (free, Windows) and VoiceOver (built into macOS and iOS) regularly. For a thorough test, I navigate the entire page without looking at the screen, using only the screen reader's audio output. This reveals issues like missing context (an "Add to cart" button that does not announce which product), confusing reading order, missing announcements for state changes, and unlabelled interactive elements. The first time you test your own site with a screen reader, you will almost certainly discover issues you never anticipated.</p>

<p><strong>User testing with people with disabilities.</strong> The gold standard of accessibility testing is watching real users with disabilities navigate your site. No amount of automated scanning or developer testing fully replaces the insights that come from observing someone who relies on assistive technology daily. I have partnered with accessibility-focused user testing services for client projects where accessibility is critical, and the findings have consistently surprised me -- users find creative workarounds for some issues while being completely blocked by others that seemed minor during developer testing.</p>

<h2 id="accessibility-and-seo-the-overlap">Accessibility and SEO: The Overlap</h2>

<p>There is a significant overlap between accessibility best practices and SEO best practices, and understanding this overlap makes both efforts more efficient.</p>

<p><strong>Semantic HTML benefits both.</strong> Screen readers use heading hierarchy to create a navigable page outline. Search engines use heading hierarchy to understand content structure and topical relevance. When you write proper semantic HTML, both audiences benefit simultaneously. A page with clear <code>&lt;h2&gt;</code> headings that describe each section is easier for a screen reader user to navigate and easier for Google to understand and index.</p>

<p><strong>Alt text serves double duty.</strong> Alt text makes images accessible to screen reader users and gives search engines textual context about image content. Good alt text that accurately describes the image helps with both accessibility and image search rankings. I write alt text for humans first -- screen reader users -- and then ensure it naturally includes relevant context that also serves SEO purposes.</p>

<p><strong>Page speed connections.</strong> <a href="/blog/website-speed-optimization.html">Fast-loading pages</a> benefit both users with disabilities (who may be using older hardware or assistive technologies that add processing overhead) and search engine rankings through <a href="/blog/core-web-vitals-guide.html">Core Web Vitals</a>. Optimisations like efficient HTML, minimal JavaScript, and proper image handling improve accessibility and SEO simultaneously.</p>

<p><strong>Link text quality.</strong> Descriptive link text like "read our complete <a href="/blog/on-page-seo-guide.html">on-page SEO guide</a>" is essential for screen reader users who navigate by links and also provides keyword-rich anchor text that benefits SEO. Vague link text like "click here" or "read more" is bad for both accessibility and SEO.</p>

<h2 id="building-accessibility-into-your-workflow">Building Accessibility into Your Workflow</h2>

<p>The most cost-effective approach to accessibility is integrating it into every stage of your design and development process rather than treating it as a separate remediation effort at the end.</p>

<p><strong>Design stage.</strong> Accessibility starts before a single line of code is written. During design, I verify colour contrast for every text-background combination, ensure touch targets meet the 44 by 44 pixel minimum, design focus states for all interactive elements, plan the heading hierarchy, and consider how the layout will work for keyboard-only navigation. Catching accessibility issues in design is ten times cheaper than fixing them in development and a hundred times cheaper than fixing them after launch.</p>

<p><strong>Development stage.</strong> During development, I use semantic HTML as my starting point, test keyboard navigation as I build each component, run axe DevTools after completing each section, and test with a screen reader before considering any component done. I have a personal checklist that I run through for every interactive component: Can I reach it with Tab? Can I activate it with Enter or Space? Does the screen reader announce its role, name, and state? Does it work without JavaScript? This systematic approach catches most issues before they reach code review.</p>

<p><strong>Code review stage.</strong> I include accessibility checks in my code review process. Every pull request is checked for proper semantic HTML, alt text on new images, labels on new form inputs, keyboard accessibility for new interactive elements, and colour contrast for any new colours introduced. Having accessibility as a specific checklist item in code reviews prevents regression.</p>

<p><strong>Ongoing monitoring.</strong> Accessibility is not a one-time achievement -- it requires ongoing attention. New content, design updates, third-party widget additions, and CMS-managed content can all introduce accessibility issues. I run automated accessibility scans monthly and conduct more thorough manual audits quarterly. For sites with frequent content updates, I train content editors on accessibility basics: writing proper alt text, using heading hierarchy correctly, and creating descriptive link text.</p>

<h2 id="common-accessibility-mistakes-and-fixes">Common Accessibility Mistakes and Fixes</h2>

<p>After auditing dozens of websites for accessibility, I have compiled a list of the most common issues I encounter. If you fix just these items, you will address the majority of accessibility barriers on most websites.</p>

<p><strong>Missing or poor alt text.</strong> This is the single most common accessibility failure. Every informative image needs descriptive alt text. Every decorative image needs an empty <code>alt=""</code>. Alt text should describe what the image communicates, not just what it depicts. For <a href="/blog/mobile-first-web-design.html">responsive images</a> using <code>&lt;picture&gt;</code> elements, the alt attribute goes on the <code>&lt;img&gt;</code> element inside the <code>&lt;picture&gt;</code>.</p>

<p><strong>Insufficient colour contrast.</strong> Text below the 4.5:1 contrast threshold is difficult or impossible to read for users with low vision. Fix this by darkening text colours or lightening backgrounds until the ratio meets WCAG AA requirements. Do not reduce contrast for aesthetic reasons -- readability is not negotiable.</p>

<p><strong>Missing form labels.</strong> Every form input needs an associated visible label. Replace placeholder-only inputs with properly labelled inputs. This single change improves usability for all users while fixing a critical accessibility barrier for screen reader users.</p>

<p><strong>Inaccessible custom components.</strong> Dropdown menus, modal dialogs, carousels, and accordions built with <code>&lt;div&gt;</code> elements and JavaScript click handlers are almost always inaccessible. Rebuild them using proper semantic HTML with appropriate ARIA attributes and keyboard event handlers, or use a tested component library like Radix UI or Headless UI that handles accessibility correctly.</p>

<p><strong>No focus management.</strong> Removed or invisible focus indicators, focus that gets lost after dynamic content changes, modals that do not trap focus -- these are all common issues that make keyboard navigation impossible or frustrating. Implement visible focus indicators using <code>:focus-visible</code>, manage focus programmatically when content changes dynamically, and trap focus within modal dialogs.</p>

<h2 id="frequently-asked-questions">Frequently Asked Questions</h2>

<div class="faq-section">
<div class="faq-item">
<h3>What is WCAG and which level should I aim for?</h3>
<p>WCAG stands for Web Content Accessibility Guidelines, published by the W3C. It has three conformance levels: A (minimum), AA (recommended), and AAA (highest). Most organisations should aim for WCAG 2.2 Level AA, which is the standard referenced by most accessibility laws worldwide including the European Accessibility Act and ADA requirements in the United States. Level AA covers the most impactful accessibility requirements without being prohibitively difficult to implement. Level AAA is aspirational and includes stricter requirements like 7:1 colour contrast ratios that may conflict with brand guidelines. I recommend targeting AA as the baseline and implementing AAA criteria where practical.</p>
</div>

<div class="faq-item">
<h3>Does web accessibility affect SEO?</h3>
<p>Yes, web accessibility and SEO overlap significantly. Semantic HTML helps both screen readers and search engine crawlers understand your content structure. Alt text on images serves screen reader users and gives search engines context about image content. Proper heading hierarchy aids both navigation for screen reader users and content understanding for search algorithms. Page speed improvements benefit both accessibility and Core Web Vitals scores. Good link text helps screen reader users understand link destinations and provides keyword-rich anchor text for SEO. In my experience, fixing accessibility issues on a website almost always improves its SEO performance as a beneficial side effect.</p>
</div>

<div class="faq-item">
<h3>How do I test my website for accessibility?</h3>
<p>I use a layered testing approach. Automated tools like axe DevTools, WAVE, and Lighthouse catch approximately 30 to 40 percent of accessibility issues -- mainly technical violations like missing alt text, insufficient contrast, and incorrect ARIA usage. Manual testing covers the rest: navigate the entire site using only a keyboard, test with a screen reader like NVDA or VoiceOver, check colour contrast with a tool like Colour Contrast Analyser, and verify that all interactive elements are properly labelled. For comprehensive coverage, combine automated scans with manual keyboard testing, screen reader testing, and ideally user testing with people who have disabilities.</p>
</div>

<div class="faq-item">
<h3>Are accessibility overlays and widgets effective?</h3>
<p>No, accessibility overlay widgets are not an effective solution and I strongly advise against them. These tools add a JavaScript widget to your site that claims to fix accessibility issues automatically, but they cannot address fundamental structural problems like missing semantic HTML, incorrect heading hierarchy, or poor keyboard navigation. Many disability advocacy organisations have publicly opposed overlays because they often interfere with the assistive technologies users already rely on. Some overlays have even been the subject of accessibility lawsuits themselves. The only reliable path to accessibility is building it into your site's HTML, CSS, and JavaScript from the start.</p>
</div>

<div class="faq-item">
<h3>How much does it cost to make a website accessible?</h3>
<p>The cost varies enormously depending on the size and complexity of your site and how far it currently is from compliance. For a new website, building accessibility in from the start adds roughly 10 to 15 percent to development time -- a modest investment that avoids expensive retrofitting later. For existing sites, a basic accessibility remediation of a small business website typically costs between 2,000 and 10,000 USD depending on the severity of issues. Large enterprise sites can cost significantly more. The most cost-effective approach is to integrate accessibility into your standard development workflow so that every new page and feature is built accessibly from day one, rather than treating it as a separate remediation project.</p>
</div>
</div>

<div class="article-callout" role="complementary" aria-label="Key takeaway">
<div class="article-callout-icon" aria-hidden="true">&#x1F4A1;</div>
<div>
<strong>The bottom line:</strong> Web accessibility is not optional, and it is not just about compliance. It is about building websites that work for the full spectrum of human ability. Start with semantic HTML, ensure keyboard navigation works, maintain colour contrast standards, provide text alternatives for non-text content, and test with real assistive technologies. The effort pays for itself in broader reach, better SEO, improved usability for all users, and reduced legal risk. If you need help making your website accessible, <a href="/contact.html">get in touch</a> and we can discuss your specific needs.
</div>
</div>
