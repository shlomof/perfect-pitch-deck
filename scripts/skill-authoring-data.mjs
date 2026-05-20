// Per-slide authoring inputs folded into each SKILL.md by build-skills.mjs.
//
// Schema per slide:
//   strategicIntent     — 1–3 sentences. The slide's WHY in the pitch arc.
//                         Sourced from notes/slide-NN.html (verbatim coaching).
//   requiresBriefFields — exact brief.yaml paths this slide MUST have.
//   optionalBriefFields — brief.yaml paths this slide reads if present.
//   voiceRules          — 3–5 tone bullets specific to THIS slide.
//   antiPatterns        — { bad, why } examples of common LLM failure modes.
//
// Hand-edit this file freely. Keep voiceRules tight — verbosity dilutes signal.

export const SKILL_AUTHORING = {
  1: {
    strategicIntent: `The cover is a tone-setter, not a title slide. In 3 seconds it has to broadcast "this pitch was built for you, by a pro who knows what they're doing" — the pitch name signals personalisation, the CTA signals momentum, and the bullets signal substance. If it reads like a generic SaaS cover the rest of the deck is fighting uphill.`,
    requiresBriefFields: ["company", "pitch_name", "cta.url", "cta.label"],
    optionalBriefFields: ["offer.dream_outcome"],
    voiceRules: [
      "Punchy. Title case for the pitch name, sentence case everywhere else.",
      "Lede is one sentence promising what the deck does for the reader — not what it is.",
      "Bullets are concrete benefits or distinguishers, not features. Max 6 words each.",
      "CTA verb-first: 'Click here for…', 'See the…', 'Start with…'. Never 'Learn more'.",
      "No emoji. No 'welcome'. No 'introducing'.",
    ],
    antiPatterns: [
      { bad: "Welcome to our Q4 sales presentation", why: "no pitch name, no audience, generic event-deck framing" },
      { bad: "Introducing Acme — A Modern Solution for Modern Teams", why: "tagline soup, says nothing, no CTA" },
      { bad: "Click here to learn more", why: "passive verb, gives the reader nothing to anticipate" },
    ],
  },

  2: {
    strategicIntent: `Authoritative storytelling icebreaker. Open by namedropping a real client who looks like the prospect — same industry, same pain, recent work. The job is to make the prospect think "they already get my world" before slide 3 lands the problem. Skip small talk; lead with a recognisable name and a specific outcome you're currently delivering.`,
    requiresBriefFields: ["client_name"],
    optionalBriefFields: ["proof_points.testimonials", "offer.dream_outcome", "company"],
    voiceRules: [
      "First-person, conversational — written the way you'd say it on a call.",
      "Name a real client. Use their name in the copy, not a placeholder.",
      "Reference common ground: industry, stage, or specific pain.",
      "End on momentum — what's happening right now, what's exciting.",
      "No weather, no city, no 'hope you're well'. Earn the room.",
    ],
    antiPatterns: [
      { bad: "Thanks so much for taking the time to meet with me today!", why: "small talk, zero authority, wastes the rapport window" },
      { bad: "We've worked with a number of leading brands across various industries", why: "vague flex, names no one, builds no trust" },
      { bad: "I was just thinking about you the other day…", why: "performative warmth, no story, no credibility transfer" },
    ],
  },

  3: {
    strategicIntent: `The cold hard truth. Surface the prospect's single biggest, most-named pain and stare at it. This slide isn't a list — it's one visceral sentence that makes them nod and lean in. Done right it earns permission to agitate further in slide 4 and promise in slide 5.`,
    requiresBriefFields: ["offer.problem"],
    optionalBriefFields: ["client_name"],
    voiceRules: [
      "Second-person. 'You' and 'your' — never 'companies' or 'teams'.",
      "Name the pain in concrete terms. No abstractions, no 'challenges', no 'pain points'.",
      "One sentence preferred. Two max. Should read like a quote on a wall.",
      "Cut every hedge: 'often', 'sometimes', 'many', 'can be'.",
      "If a stat sharpens it, use one number. Otherwise none.",
    ],
    antiPatterns: [
      { bad: "Many businesses today face a variety of challenges when it comes to growth.", why: "abstract, hedged, third-person, says nothing" },
      { bad: "It can be frustrating when things don't go as planned.", why: "weasel words, no specific pain, no urgency" },
      { bad: "Pain points include inefficiency, scalability, and ROI.", why: "buzzword list, not a felt problem" },
    ],
  },

  4: {
    strategicIntent: `Hit them where it hurts. Slide 3 named the wound; this slide twists. Enumerate the ongoing cost of inaction — the daily leak, the missed window, the bigger fire on the horizon. Build tension high enough that the promise on slide 5 lands like relief.`,
    requiresBriefFields: ["offer.problem"],
    optionalBriefFields: ["offer.dream_outcome"],
    voiceRules: [
      "Second-person. Keep 'you' / 'your' on every line.",
      "Stack 3–5 agitators. Each one a distinct consequence, not a synonym.",
      "Be specific about cost: time, money, opportunity, reputation, sleep.",
      "Future-tense the consequences — 'it's only going to get worse' energy.",
      "No solving yet. Don't even hint at the fix.",
    ],
    antiPatterns: [
      { bad: "These problems are common and affect productivity.", why: "abstract, no felt cost, no escalation" },
      { bad: "Luckily, there's a better way — and we can help.", why: "breaks the agitation, leaks the promise too early" },
      { bad: "Inefficient processes, lack of alignment, poor visibility.", why: "consultant-speak list, no second-person, no twist" },
    ],
  },

  5: {
    strategicIntent: `The big blue promise. After two slides of pain, this is the moment of relief — a single bold sentence the prospect can repeat back word-for-word. Promise an outcome, not a methodology. Make it feel reckless enough to be true.`,
    requiresBriefFields: ["offer.dream_outcome", "offer.timeframe"],
    optionalBriefFields: ["offer.guarantee", "offer.problem"],
    voiceRules: [
      "One sentence. Quote-on-a-wall energy.",
      "Promise an outcome, not a feature. Verbs of transformation.",
      "Specific numbers and a timeframe wherever possible.",
      "Add the risk reversal if the guarantee supports it ('…or we keep working').",
      "No jargon. No 'solutions', 'systems', 'platforms', 'methodologies'.",
    ],
    antiPatterns: [
      { bad: "Our methodology helps creators achieve scalable growth through proprietary AI-driven content systems.", why: "jargon stack, no promise, no specifics" },
      { bad: "We help you grow.", why: "no specificity, no risk reversal, too short to feel deliberate" },
      { bad: "Unlock your business's full potential with our end-to-end platform.", why: "marketing fluff, promises nothing measurable" },
    ],
  },

  6: {
    strategicIntent: `Ease the pain. Three to five key messages that translate the big promise into felt benefits — what changes for them in week one, month one, quarter one. Each line is a bridge from a specific pain to a specific relief.`,
    requiresBriefFields: ["offer.dream_outcome"],
    optionalBriefFields: ["offer.problem", "offer.unique_mechanism"],
    voiceRules: [
      "Benefit-led, not feature-led. 'You stop X / you start Y.'",
      "Parallel structure across all bullets. Same grammatical shape.",
      "Tangible verbs: 'cut', 'ship', 'close', 'recover', 'reclaim'.",
      "Each message must map to a pain raised in slides 3–4.",
      "Max ~12 words per message. No sub-bullets.",
    ],
    antiPatterns: [
      { bad: "Best-in-class platform with industry-leading capabilities.", why: "feature-vague, no benefit, no second-person" },
      { bad: "Improved efficiency, increased ROI, enhanced collaboration.", why: "consultant trio, no specificity, no felt change" },
      { bad: "Our solution offers a comprehensive suite of tools to address your needs.", why: "abstract, vendor-voice, doesn't ease any pain" },
    ],
  },

  7: {
    strategicIntent: `Same as slide 6 — ease the pain via key messages — but with image slots that let real screenshots or product shots carry the proof. The job is the same: bridge pain to relief with parallel, specific benefits, and let the visuals show what the words promise.`,
    requiresBriefFields: ["offer.dream_outcome"],
    optionalBriefFields: ["offer.problem", "offer.unique_mechanism", "extra.key_outcomes_images"],
    voiceRules: [
      "Treat images as proof, copy as promise — they must reinforce each other.",
      "Benefit-led headlines. Image captions stay descriptive, not salesy.",
      "Parallel structure across all messages.",
      "Show, don't list features. The image is the feature; copy is the outcome.",
      "Keep each headline punchy — visuals do the heavy explanation.",
    ],
    antiPatterns: [
      { bad: "Screenshot of dashboard. Caption: 'Our dashboard.'", why: "image with no narrative weight, caption adds nothing" },
      { bad: "See below for a comprehensive view of our product suite.", why: "tour-guide voice, no benefit, no second-person" },
      { bad: "Streamline. Optimize. Accelerate.", why: "verb-soup with no object, says nothing about outcomes" },
    ],
  },

  8: {
    strategicIntent: `Service delivery with visuals. After the promise lands, prove you can deliver — show the process via real work, screenshots, deliverables. Don't info-dump steps; let the artefacts sell the trust. This is the "we've done this before, here's the receipts" slide.`,
    requiresBriefFields: ["offer.unique_mechanism"],
    optionalBriefFields: ["proof_points.testimonials", "extra.process_assets"],
    voiceRules: [
      "Lead with the artefact, not the methodology.",
      "Describe what happens in plain language — no acronyms, no framework names.",
      "Use 'we' for the delivery, 'you' for what they get out of it.",
      "Concrete nouns: 'kickoff workshop', 'audit doc', 'weekly demo' — not 'engagement'.",
      "Skip phase numbers if the steps speak for themselves.",
    ],
    antiPatterns: [
      { bad: "Phase 1: Discovery. Phase 2: Strategy. Phase 3: Execution.", why: "consultancy boilerplate, says nothing about what actually happens" },
      { bad: "Our proprietary framework leverages best-in-class methodologies.", why: "buzzword salad, no artefacts, builds zero trust" },
      { bad: "We follow a proven process tailored to each client.", why: "filler, no specifics, no proof" },
    ],
  },

  9: {
    strategicIntent: `Service delivery without visuals — copy carries the weight. Same job as slide 8 (prove you can deliver) but the words must do all the trust-building. Lean into specifics: who runs each part, what they actually produce, how the prospect knows it's working.`,
    requiresBriefFields: ["offer.unique_mechanism"],
    optionalBriefFields: ["team", "offer.timeframe"],
    voiceRules: [
      "Specifics over structure. Real deliverables, real cadences, real names if possible.",
      "Active verbs: 'we run', 'we build', 'you sign off', 'you review'.",
      "Anchor each step to a tangible output the prospect can picture.",
      "No phase-1/phase-2/phase-3 unless the cadence genuinely matters.",
      "Cut anything that sounds like a slide from a consultancy pitch.",
    ],
    antiPatterns: [
      { bad: "Step 1: Onboarding. Step 2: Implementation. Step 3: Ongoing support.", why: "every vendor on earth has this slide, says nothing" },
      { bad: "We work closely with your team to ensure alignment.", why: "filler phrase, no specifics, no trust transfer" },
      { bad: "End-to-end service from initial consultation to long-term partnership.", why: "brochure-voice, no artefacts, no proof of expertise" },
    ],
  },

  10: {
    strategicIntent: `Objection crusher. Read the prospect's mind out loud — name the doubt they're already thinking, normalise it, then alley-oop to the proof on slides 11–13. The line "I hear that a lot" disarms; the rebuttal is the next slide.`,
    requiresBriefFields: ["offer.problem"],
    optionalBriefFields: ["proof_points.testimonials"],
    voiceRules: [
      "Open with 'You might be thinking…' or a close variant. Then quote the objection.",
      "The objection must be the real one — 'too expensive', 'we tried before', 'won't work for us'.",
      "Validate before resolving. 'I hear that a lot' / 'totally fair' / 'most people do'.",
      "Don't fully resolve here — tee up the proof slides.",
      "No defensive language, no 'actually', no 'but'.",
    ],
    antiPatterns: [
      { bad: "You might be wondering if we're the right fit.", why: "soft non-objection, dodges the real doubt" },
      { bad: "We know change can be hard, but we make it easy!", why: "patronising, doesn't name a specific objection, no setup for proof" },
      { bad: "Don't worry — our solution is designed for businesses just like yours.", why: "dismissive, no validation, no objection actually named" },
    ],
  },

  11: {
    strategicIntent: `Irrefutable proof. Three customer wins with specific metrics that map directly to the objection just raised on slide 10. Numbers do the heavy lifting — revenue up, costs down, time saved — each tied to a recognisable name or logo. This is where claims become receipts.`,
    requiresBriefFields: ["proof_points.testimonials"],
    optionalBriefFields: ["proof_points.logos"],
    voiceRules: [
      "Lead with the metric. Number first, context second.",
      "Use real names, real companies, real numbers. No 'a leading brand'.",
      "Each win addresses a different objection or proves a different message.",
      "Short captions: who, what changed, in how long.",
      "No adjectives on the metric — '+$847K revenue' beats 'massive revenue growth'.",
    ],
    antiPatterns: [
      { bad: "Significant ROI for our enterprise clients.", why: "no number, no name, no specificity" },
      { bad: "+200% growth across the board.", why: "growth in what, for whom, over what period — meaningless" },
      { bad: "Customers love us!", why: "not proof, not a metric, not a story" },
    ],
  },

  12: {
    strategicIntent: `Story time — a single customer quote that drives the core message home. The quote is short; the value comes from the story the seller tells around it on the call. Pick the quote that sounds most like the prospect's own words about their own problem.`,
    requiresBriefFields: ["proof_points.testimonials"],
    optionalBriefFields: [],
    voiceRules: [
      "Quote stays under 25 words. Punchy, conversational, ideally first-person from the client.",
      "Attribution: name, role, company. Handle optional. Photo if available.",
      "Pick a quote that mirrors the prospect's pain or doubt — not a generic rave.",
      "Don't paraphrase or polish — verbatim sounds true, edited sounds like marketing.",
      "Avoid stacked superlatives ('amazing, incredible, life-changing').",
    ],
    antiPatterns: [
      { bad: "\"This product is amazing and has changed everything for us!\" — Anonymous Customer", why: "vague rave, no attribution, no specifics, sounds fabricated" },
      { bad: "\"10/10 would recommend.\"", why: "Yelp-voice, no context, no story hook" },
      { bad: "A 200-word testimonial covering every feature and benefit.", why: "too long to read on slide, dilutes the punch" },
    ],
  },

  13: {
    strategicIntent: `Our customers — the logo wall. On its own a list of logos is wallpaper; on a call you pick one logo and tell a transformation story. The slide's job is to let the prospect's eyes catch a logo they recognise; the seller's job is to make that logo come alive.`,
    requiresBriefFields: ["proof_points.logos"],
    optionalBriefFields: ["proof_points.testimonials"],
    voiceRules: [
      "Logos only — no taglines, no descriptors under each one.",
      "Order matters: most-recognisable or most-relevant-to-prospect first.",
      "Keep it tight — 6–12 logos. A wall of 40 logos screams 'we'll work with anyone'.",
      "Headline (if any) is the implied claim: 'Trusted by…', 'Companies like yours…'.",
      "Don't mix tiers — a startup logo next to Google reads as bluffing.",
    ],
    antiPatterns: [
      { bad: "A grid of 40 small logos with no hierarchy.", why: "wallpaper, no story, dilutes every logo on it" },
      { bad: "Tagline under each logo: 'World leader in X', 'Industry pioneer in Y'.", why: "performative, distracts from the logos, looks desperate" },
      { bad: "Mixing recognisable brands with no-name startups in the same row.", why: "credibility flattens to the lowest logo on the wall" },
    ],
  },

  14: {
    strategicIntent: `The unique mechanism. Why you, why now, why not the alternatives. Name the specific thing you do that no one else does — the proprietary angle, the contrarian method, the unfair advantage. Vague differentiation here means a price-comparison conversation later.`,
    requiresBriefFields: ["company", "offer.unique_mechanism"],
    optionalBriefFields: ["proof_points.testimonials"],
    voiceRules: [
      "Name the mechanism. Give it a label the prospect can repeat.",
      "Explain what it does and why it works — one sentence each.",
      "Contrast implied or explicit — 'unlike most…', 'while everyone else…'.",
      "Confident, not boastful. 'Only' is fine if it's true.",
      "Avoid the word 'unique' — show, don't claim.",
    ],
    antiPatterns: [
      { bad: "We're a unique, innovative, customer-first company.", why: "every adjective is empty, names no actual mechanism" },
      { bad: "Our proprietary methodology delivers superior results.", why: "buzzword, no specifics, no contrast with alternatives" },
      { bad: "We're different because we care.", why: "every vendor 'cares' — that's not a mechanism" },
    ],
  },

  15: {
    strategicIntent: `Team — optional, deploy only when it adds trust. Names and faces matter on high-ticket deals or projects where execution risk is real. If the team isn't a flex, skip the slide; a thin team page hurts more than no team page.`,
    requiresBriefFields: ["team", "company"],
    optionalBriefFields: [],
    voiceRules: [
      "Each bio earns its place — relevant credential, recognisable past role, or specific expertise.",
      "Skip generic titles. 'Head of Customer Success' tells the prospect nothing; specifics do.",
      "First name and last name. Real photos, not avatars.",
      "Bios under 20 words. Lead with the most credible fact.",
      "If the team is one person, this slide is probably the wrong move.",
    ],
    antiPatterns: [
      { bad: "John Smith — Passionate about customer success and building great teams.", why: "platitudes, no credential, no trust signal" },
      { bad: "A stock photo with a generic role title underneath.", why: "kills trust faster than no team slide at all" },
      { bad: "A 15-person team grid where most are 'Operations' or 'Support'.", why: "padding the wall — only show the people the prospect will actually interact with or whose names carry weight" },
    ],
  },

  16: {
    strategicIntent: `Future pacing. Make the prospect feel six months ahead — problem solved, outcome real. This isn't a benefits recap; it's a guided visualisation. The job is to install the after-state in their head so the offer on slide 17 lands as the obvious bridge.`,
    requiresBriefFields: ["offer.dream_outcome", "offer.timeframe"],
    optionalBriefFields: ["offer.problem"],
    voiceRules: [
      "Open with 'Imagine…' or 'Picture…'. Address them directly.",
      "Concrete sensory detail — what they see in their dashboard, what their inbox looks like, what their team is doing.",
      "Timeframe specific: 'six months from now', 'by Q3', 'this time next year'.",
      "Forward-tense throughout. Treat the outcome as already real.",
      "Don't pitch the offer here — paint the after, then move on.",
    ],
    antiPatterns: [
      { bad: "Imagine the possibilities.", why: "no image, no detail, lazy invocation" },
      { bad: "You could potentially see significant improvements over time.", why: "hedged, conditional, breaks the visualisation" },
      { bad: "With our solution, the future looks bright.", why: "vendor-voice, generic, doesn't pace any specific future" },
    ],
  },

  17: {
    strategicIntent: `Today's offer — the value stack. Frame the offer the way Hormozi frames it: stack tangible inclusions and outcomes so the price (revealed later) feels like a steal. This is the headline of the offer; slides 18–22 are the line items.`,
    requiresBriefFields: ["offer.name", "offer.dream_outcome"],
    optionalBriefFields: ["offer.timeframe", "offer.unique_mechanism"],
    voiceRules: [
      "Lead with the offer name and the dream outcome side-by-side.",
      "Build anticipation, not a feature list — that's slide 18's job.",
      "Confident framing: 'Here's exactly what you get when you say yes.'",
      "Use the offer's actual name throughout; reinforce the label.",
      "Don't reveal price yet — keep eyes on value.",
    ],
    antiPatterns: [
      { bad: "Our package includes a variety of features and benefits.", why: "no name, no outcome, no stack, vendor-voice" },
      { bad: "Choose from our flexible offering tailored to your needs.", why: "deflects the offer instead of presenting it boldly" },
      { bad: "Starting at $X/month.", why: "leads with price before value is built — kills the stack" },
    ],
  },

  18: {
    strategicIntent: `What's included. Translate the value stack into concrete deliverables — 3–5 strong inclusions the prospect can point to. Each line should feel valuable enough to be its own product. Avoid kitchen-sinking; clarity beats volume.`,
    requiresBriefFields: ["offer.name"],
    optionalBriefFields: ["extra.inclusions"],
    voiceRules: [
      "Each inclusion gets a name (like a product) and a one-line description.",
      "Outcome-flavoured names beat feature-flavoured ones: 'The 90-Day Sprint' > '12 weekly calls'.",
      "Keep to 3–5 inclusions if possible. More than 7 reads as desperate stacking.",
      "Parallel structure across all lines.",
      "No 'access to', no 'support', no 'consultation' unless that's literally the deliverable.",
    ],
    antiPatterns: [
      { bad: "Access to our platform, ongoing support, regular check-ins.", why: "generic deliverables every vendor offers, no naming, no specificity" },
      { bad: "Unlimited everything!", why: "smells like an upsell trap, devalues the rest of the stack" },
      { bad: "12 inclusions listed at 6pt type to fit them all.", why: "cluttered, none of them feel valuable when stacked this small" },
    ],
  },

  19: {
    strategicIntent: `Tiered pricing — the decoy structure. Three plans where the middle one is engineered to look like the obvious winner. Anchor with a premium tier, expose value gaps in the cheap tier, make the recommended tier the path of least resistance.`,
    requiresBriefFields: ["plans"],
    optionalBriefFields: ["offer.name", "offer.guarantee"],
    voiceRules: [
      "Three tiers. Name each one — not 'Basic / Pro / Enterprise', use names that signal use-case or ambition.",
      "Anchor high. The premium tier exists to make the middle tier look smart.",
      "Mark one tier as 'Most popular' or 'Recommended'. Don't be coy.",
      "Each tier lists its core promise first, then 3–5 inclusions.",
      "Prices visible. Hidden pricing on a tier slide kills trust.",
    ],
    antiPatterns: [
      { bad: "Contact us for pricing.", why: "kills the close, breaks the decoy structure, signals overpriced" },
      { bad: "Basic / Pro / Enterprise.", why: "no positioning, no use-case signal, looks copy-pasted" },
      { bad: "Three tiers with near-identical inclusions and a $5 price gap.", why: "no anchoring, no decoy effect, middle tier doesn't win" },
    ],
  },

  20: {
    strategicIntent: `But that's not all… Bonuses that compound the value stack and trigger urgency. Each bonus has a name, a tangible outcome, and an expiry — so the structure does the pushing instead of the seller. If the bonus would still be there next month, it's not a bonus.`,
    requiresBriefFields: ["bonus"],
    optionalBriefFields: ["urgency.text", "urgency.expires_at"],
    voiceRules: [
      "Each bonus gets a product-style name and a one-line outcome.",
      "Time-bound: explicit expiry ('for the next 48 hours', 'when you sign by Friday').",
      "Bonuses must feel additive, not like core features in disguise.",
      "Confident framing — 'we're including' / 'you also get', never 'we'll throw in'.",
      "Cap at 2–3 bonuses. More than that reads as desperate.",
    ],
    antiPatterns: [
      { bad: "Bonus: Extra support.", why: "vague, not time-bound, doesn't compound value" },
      { bad: "Free t-shirt with every signup!", why: "swag-tier bonus on a high-ticket offer trivialises the deal" },
      { bad: "Limited time bonus available… act fast!", why: "no actual deadline, no real bonus named, theatrical urgency" },
    ],
  },

  21: {
    strategicIntent: `Drop the mic — the guarantee. Reverse the risk so taking the deal is obviously safer than walking away. The bolder the guarantee, the more it signals you actually believe what you've promised. Small print is fine; weasel terms are not.`,
    requiresBriefFields: ["offer.guarantee"],
    optionalBriefFields: ["offer.dream_outcome", "offer.timeframe"],
    voiceRules: [
      "State the guarantee in plain words — 'money back', 'we keep working', 'we pay you'.",
      "Specific timeframe and condition. '90 days, do the work, not happy, full refund.'",
      "Confident, not defensive. The guarantee is a flex.",
      "Small print is allowed for the one fair condition (e.g. 'jump on a 10-min call first').",
      "No 'satisfaction guaranteed', no 'we stand behind our work' — show the mechanism.",
    ],
    antiPatterns: [
      { bad: "100% satisfaction guaranteed.", why: "meaningless phrase, no mechanism, no condition, no specifics" },
      { bad: "Refunds available subject to terms and conditions.", why: "weasel language, kills trust, signals there's a trapdoor" },
      { bad: "We stand behind our work.", why: "every vendor says this — names no actual risk reversal" },
    ],
  },

  22: {
    strategicIntent: `Drop the mic again — urgency and scarcity. Combine a real cap (we take X clients this quarter) with a real deadline (this price expires Friday). The urgency must be true; manufactured scarcity is detected on contact and torches the whole pitch.`,
    requiresBriefFields: ["offer.name", "offer.price", "urgency.text"],
    optionalBriefFields: ["urgency.expires_at"],
    voiceRules: [
      "Name both the cap and the deadline. Be specific: 'three spots', 'until Friday 5pm'.",
      "Tie scarcity to quality of service, not artificial limits.",
      "Confident close: 'lock in the price', 'secure your spot' — assume they want in.",
      "Restate the offer price and what it includes — anchor before the ask.",
      "No fake countdowns, no 'limited time only!!!' — the structure is the urgency.",
    ],
    antiPatterns: [
      { bad: "Limited time offer — act now!", why: "no specific deadline, no specific cap, manufactured urgency" },
      { bad: "Only 2 spots left! (we say this every week)", why: "transparent fake scarcity destroys credibility" },
      { bad: "Special pricing for early adopters.", why: "no deadline, no cap, no actual scarcity mechanism named" },
    ],
  },

  23: {
    strategicIntent: `Clear next step — the close. One unambiguous ask, then stop talking. The slide gives the prospect three explicit options (in / question / out) so they have permission to commit verbally on the call. Whatever closing tactic you've chosen, present it and shut up.`,
    requiresBriefFields: ["cta.url", "cta.label"],
    optionalBriefFields: ["offer.name", "offer.price"],
    voiceRules: [
      "One ask. Specific verb, specific next action. 'Book the kickoff', 'sign the SOW', 'pick a plan'.",
      "Make the path one-click obvious — link, button, or in-meeting choice.",
      "Leave the three-option commitment scaffolding intact: I'm in / question / out.",
      "Tone is calm and certain — you've earned the close.",
      "No new value, no recaps, no 'and one more thing'.",
    ],
    antiPatterns: [
      { bad: "Reach out whenever you're ready to learn more.", why: "no ask, no next step, no time pressure, passive close" },
      { bad: "Looking forward to hearing your thoughts!", why: "deflects the close, invites stall, no commitment frame" },
      { bad: "Final recap of all 22 previous slides on the close slide.", why: "violates 'make the ask and stop talking' — buries the CTA" },
    ],
  },
};
