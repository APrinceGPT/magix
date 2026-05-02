import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local
const envPath = join(__dirname, '../.env.local')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map((p, i) => i === 1 ? p.trim() : p.trim()))
)

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
})

// ─────────────────────────────────────────────
// LESSONS DATA — 42 lessons across 4 categories
// ─────────────────────────────────────────────

const LESSONS = [

  // ══════════════════════════════
  // FOUNDATIONS (8 lessons)
  // ══════════════════════════════

  {
    _id: 'lesson-card-anatomy',
    _type: 'lesson',
    title: 'Card Anatomy',
    slug: { _type: 'slug', current: 'card-anatomy' },
    category: 'foundations',
    level: 'complete-beginner',
    tagline: 'Know your weapon before you learn to wield it.',
    overview: "Every playing card is a carefully engineered object. Before you can manipulate a deck, you need to understand exactly what you're holding. Magicians who understand card anatomy spot opportunities that others miss — and they never get caught off guard by a card that behaves unexpectedly.",
    estimatedTime: 5,
    featured: true,
    order: 1,
    steps: [
      { _key: 'ca-s1', stepNumber: 1, title: 'The Face and Back', instruction: "Hold a card face-up. The face is the printed side showing suit and value. The back features a repeating pattern that looks identical across all 52 cards. This uniformity is what makes deception possible — every card looks the same from behind.", cardAnimation: 'reveal' },
      { _key: 'ca-s2', stepNumber: 2, title: 'The Indices', instruction: "Look at the top-left and bottom-right corners. These small printed symbols show the card's value (A, 2–10, J, Q, K) and suit (♠ ♥ ♦ ♣). They appear twice so the card is readable when held in a fan. A magician uses these to secretly identify a card without showing its face.", fingerNote: "When fanning cards toward a spectator, control the spread so only the indices of one specific card are visible at a time." },
      { _key: 'ca-s3', stepNumber: 3, title: 'Pips and Face Cards', instruction: "Number cards (2–10) show pip symbols — the large suit symbols arranged in a count-matching pattern. Face cards (Jack, Queen, King) show illustrated figures. The Ace bears a single large pip in the center and is traditionally the most decorated card in the deck." },
      { _key: 'ca-s4', stepNumber: 4, title: 'The White Border', instruction: "Every card has a narrow white border around the printed design. This border makes the deck appear perfectly squared when viewed from the side. Tiny misalignments at the border are what get magicians caught during cuts and controls.", fingerNote: "When performing controls, always maintain perfect border alignment. Even a 1mm offset is visible to a sharp-eyed spectator." },
    ],
    commonMistakes: [
      { _key: 'ca-m1', mistake: 'Ignoring card condition', fix: 'Always perform with a new or near-new deck. Bent, worn, or marked cards break the illusion before you\'ve done a single move.' },
      { _key: 'ca-m2', mistake: 'Not knowing which cards are which by feel', fix: 'After handling a deck extensively, you\'ll develop sensitivity to deck position and card stiffness. Practice identifying face cards by touch.' },
    ],
    practiceDrill: { title: 'Blind Sort', description: 'Without looking, sort a shuffled deck into face cards and number cards by touch alone. Focus on the stiffness difference.', reps: '3 × full deck, daily for one week' },
    performanceContext: "Card anatomy knowledge rarely appears directly in performance — but it's the foundation everything else is built on. When you can feel a break, spot an index, or detect a subtle crimp, you'll understand exactly why those skills matter.",
  },

  {
    _id: 'lesson-how-to-hold-a-deck',
    _type: 'lesson',
    title: 'How to Hold a Deck',
    slug: { _type: 'slug', current: 'how-to-hold-a-deck' },
    category: 'foundations',
    level: 'complete-beginner',
    tagline: "Your grip is your technique. Everything flows from here.",
    overview: "The way you hold a deck determines every move you can make with it. Three grips dominate card magic: dealer's grip for dealing and spreading, mechanic's grip for controls and forces, and biddle grip for specific steals and moves. You'll use all three constantly.",
    estimatedTime: 8,
    featured: false,
    order: 2,
    steps: [
      { _key: 'hd-s1', stepNumber: 1, title: "Dealer's Grip", instruction: "Hold the deck in your left hand. It rests across your four fingers, which curl up along the right long edge. Your thumb rests along the left long edge. The deck is roughly horizontal. This is the starting position for almost every deal, shuffle, and spread.", cardAnimation: 'fan', fingerNote: "Your index finger curls slightly against the front short edge. This gives you control of the deck's forward motion during deals." },
      { _key: 'hd-s2', stepNumber: 2, title: "Mechanic's Grip", instruction: "Similar to dealer's grip, but your index finger extends along the front short edge of the deck. This grip gives finer control — you can feel every card, hold breaks easily, and execute cuts with precision. Most serious card workers prefer this for all their work.", fingerNote: "The index finger extension looks completely natural and isn't suspicious. Spectators rarely notice the difference." },
      { _key: 'hd-s3', stepNumber: 3, title: 'Biddle Grip', instruction: "Hold the deck from above: thumb on the near short edge, fingers on the far short edge. This is the grip used for the Biddle move, certain palms, and card-to-pocket routines. It's less common but essential for specific techniques.", cardAnimation: 'cut' },
      { _key: 'hd-s4', stepNumber: 4, title: 'Transitioning Between Grips', instruction: "The real skill is moving between grips invisibly. Practice going from dealer's to mechanic's and back in a single motion. The transition should be imperceptible — it looks like you're simply adjusting your hold.", fingerNote: "Transitions are covered during natural pauses in patter. Never switch grips while a spectator is watching your hands directly." },
    ],
    commonMistakes: [
      { _key: 'hd-m1', mistake: 'Gripping too tightly', fix: 'A white-knuckle grip telegraphs tension to your audience. Hold the deck firmly enough to control it, loosely enough that your hand looks relaxed.' },
      { _key: 'hd-m2', mistake: 'Looking at your hands', fix: 'If you look, your audience looks. Train yourself to feel your grip, not see it.' },
    ],
    practiceDrill: { title: 'Grip Cycling', description: "Cycle through all three grips without looking at your hands, while maintaining a conversation.", reps: '20 cycles, eyes up the entire time' },
    performanceContext: "Your grip choice should be invisible. The audience should never think about how you're holding the cards — they should only see confidence and ease.",
  },

  {
    _id: 'lesson-basic-spread',
    _type: 'lesson',
    title: 'Basic Spread',
    slug: { _type: 'slug', current: 'basic-spread' },
    category: 'foundations',
    level: 'complete-beginner',
    tagline: "Every magician's first gesture. Make it beautiful.",
    overview: "The ribbon spread — laying all 52 cards in a clean arc across a table — is often the very first thing an audience sees. Done well, it communicates mastery before you've performed a single trick.",
    estimatedTime: 10,
    featured: false,
    order: 3,
    steps: [
      { _key: 'bs-s1', stepNumber: 1, title: 'Table Position', instruction: "You need a soft surface — a close-up mat, felt cloth, or even carpet. Hard surfaces make the spread uneven. Place the deck face-down near the left edge of your working area.", cardAnimation: 'fan' },
      { _key: 'bs-s2', stepNumber: 2, title: 'The Push', instruction: "With your right index finger on top of the deck, push the deck to the right in one smooth motion. Your finger rides along the top, pushing each card slightly forward as you move right. The goal is even, consistent pressure throughout.", fingerNote: "The pushing finger should feel slight resistance from each card. If it feels like you're just dragging the top card, you're not engaging the whole deck." },
      { _key: 'bs-s3', stepNumber: 3, title: 'Achieving the Arc', instruction: "A straight line of cards looks mechanical. Slightly curve your motion as you spread — start pointing slightly toward yourself, end pointing slightly away. This creates a natural-looking arc." },
      { _key: 'bs-s4', stepNumber: 4, title: 'The Turnover Spread', instruction: "Once spread, draw your finger back from right to left, applying slight upward pressure to flip each card face-up as you pass. This 'ribbon turnover' — 52 cards flipping in a smooth wave — is purely visual and absolutely stunning.", cardAnimation: 'reveal', fingerNote: "The turnover flip requires that cards slightly overlap. If your spread is too sparse, cards won't flip in sequence." },
    ],
    commonMistakes: [
      { _key: 'bs-m1', mistake: 'Uneven spacing', fix: 'Slow down. Speed comes after consistency. Each card should show about 1cm of visible card in the fan.' },
      { _key: 'bs-m2', mistake: 'Cards bunching on one side', fix: "You're applying too much pressure at the start and releasing it at the end. Practice consistent, even pressure throughout the full motion." },
    ],
    practiceDrill: { title: 'The Perfect Arc', description: 'Spread the deck, assess the spacing, collect, and repeat. Film yourself from above to see where your spread bunches or gaps.', reps: '15 spreads — aiming for perfect even spacing on each' },
    performanceContext: 'Open with a spread when you want to establish authority immediately. It signals to the audience that you\'re not an amateur. Pair it with a calm statement: "Take any card you like."',
  },

  {
    _id: 'lesson-squaring-the-deck',
    _type: 'lesson',
    title: 'Squaring the Deck',
    slug: { _type: 'slug', current: 'squaring-the-deck' },
    category: 'foundations',
    level: 'complete-beginner',
    tagline: 'The move that hides every other move.',
    overview: "Squaring the deck appears in every single card routine — it's the action that conceals breaks, prepares for controls, and resets your working position. The magician who can square a deck quickly and cleanly while maintaining a hidden break has mastered one of the most important invisible skills in card magic.",
    estimatedTime: 8,
    featured: false,
    order: 4,
    steps: [
      { _key: 'sq-s1', stepNumber: 1, title: 'Basic Two-Handed Square', instruction: "Hold the deck in your left hand in mechanic's grip. Bring your right hand to the deck, thumb at the back short edge and fingers at the front short edge. Gentle squeezing pressure from both sides aligns all cards. Simultaneously, tap the long edges on your palm to align those sides.", cardAnimation: 'cut' },
      { _key: 'sq-s2', stepNumber: 2, title: 'The Table Square', instruction: "Place the deck face-down on the table. Bring all four sides inward with gentle taps using the pads of your fingers. This looks perfectly fair because the deck never leaves the table." },
      { _key: 'sq-s3', stepNumber: 3, title: 'Squaring With a Hidden Break', instruction: "The real skill: squaring the deck while maintaining a pinky break at a specific card. Your left pinky holds the break. As your right hand squares the top portion down, your pinky reseats beneath the squared cards. The audience sees a clean square — you feel exactly where your target card is.", fingerNote: "The pinky break must be completely invisible from the front. Only 1–2mm of gap is needed — enough to feel, not enough to see.", cardAnimation: 'shuffle' },
    ],
    commonMistakes: [
      { _key: 'sq-m1', mistake: 'Squaring too aggressively', fix: 'Hard taps make noise and draw attention. Gentle pressure is more effective and looks more natural.' },
      { _key: 'sq-m2', mistake: 'Losing the break during squaring', fix: 'Practice the break alone first — hold it for 30 seconds while doing nothing else. Then add the squaring action only when the break feels secure.' },
    ],
    practiceDrill: { title: 'Square and Break', description: "Have a friend insert a card anywhere. Without looking, maintain a break at that position while squaring the deck three times completely. Then name the position.", reps: '10 rounds — no peeking' },
    performanceContext: "Squaring should become so automatic it disappears from your performance entirely. The audience should never be aware it's happening — it's pure infrastructure.",
  },

  {
    _id: 'lesson-misdirection',
    _type: 'lesson',
    title: 'Misdirection',
    slug: { _type: 'slug', current: 'misdirection' },
    category: 'foundations',
    level: 'professional',
    tagline: 'Control every eye in the room. The invisible master skill.',
    overview: "Misdirection is not about distraction — it's about attention management. A master magician doesn't hide things from their audience; they decide exactly what the audience sees and when. This is the skill that separates performers who fool people from performers who create genuine wonder.",
    estimatedTime: 45,
    featured: true,
    order: 5,
    steps: [
      { _key: 'mi-s1', stepNumber: 1, title: 'The Eye Leads the Hand', instruction: "Where you look, your audience looks. This is the most fundamental principle of misdirection. When you want to conceal a move, look away from your hands. When you want to direct attention to your hands, look at them. Your gaze is a spotlight." },
      { _key: 'mi-s2', stepNumber: 2, title: 'Contrast and Motion', instruction: "The eye is drawn to movement and contrast. When you want to conceal action in one hand, create movement with the other. The audience's visual system automatically tracks the larger, more dramatic motion.", fingerNote: "A small, slow movement in the secret hand combined with a large, fast movement in the other is invisible." },
      { _key: 'mi-s3', stepNumber: 3, title: 'Timing and Naturalness', instruction: "The perfect moment to make a secret move is the moment before the audience expects to see anything. If you cause an action, then make your secret move — instead of making your move during the action — you're working against the audience's attention. Misdirection must be woven into the patter naturally." },
      { _key: 'mi-s4', stepNumber: 4, title: 'Social Misdirection', instruction: "A question demands eye contact and attention simultaneously. 'What was your card again?' redirects the audience's focus to memory retrieval — freeing your hands for a full second of invisible action. Questions are your most powerful misdirection tool." },
    ],
    commonMistakes: [
      { _key: 'mi-m1', mistake: "Using obvious misdirection", fix: '"Look over there!" is not misdirection — it\'s suspicion. The best misdirection arises naturally from the performance.' },
      { _key: 'mi-m2', mistake: 'Misdirecting too early', fix: 'Misdirection must coincide with the secret move, not precede it. A moment too early and attention drifts back before the move is complete.' },
    ],
    practiceDrill: { title: 'The Invisible Transfer', description: "Practice moving a small object from one hand to the other while looking directly at someone and asking them a question.", reps: '20 minutes daily for 30 days' },
    performanceContext: "Every secret move you know requires misdirection to be effective. Misdirection isn't something you add to your technique — it is the technique.",
  },

  {
    _id: 'lesson-patter-writing',
    _type: 'lesson',
    title: 'Patter Writing',
    slug: { _type: 'slug', current: 'patter-writing' },
    category: 'foundations',
    level: 'professional',
    tagline: 'The words that make magic feel impossible.',
    overview: "Patter is everything you say during a performance. The best patter makes tricks feel personal, meaningful, and impossible. Amateur magicians rely on generic patter — 'pick a card, any card.' Professionals craft scripted routines where every word serves a purpose.",
    estimatedTime: 60,
    featured: false,
    order: 6,
    steps: [
      { _key: 'pw-s1', stepNumber: 1, title: 'The Three Functions of Patter', instruction: "Every line of patter does one of three things: (1) misdirects attention, (2) builds tension or wonder, or (3) establishes the premise that makes the reveal impossible. Write with these functions in mind — cut any line that does none of them." },
      { _key: 'pw-s2', stepNumber: 2, title: 'Personalising Your Script', instruction: "Generic patter ('Think of a card...') creates no connection. Personalised patter references the spectator by name, their life, their relationship to others present. 'Sarah, you've known me for years — you know I couldn't possibly know...' is infinitely stronger." },
      { _key: 'pw-s3', stepNumber: 3, title: 'The Moment of Impossibility', instruction: "The reveal should feel genuinely impossible — and your patter at the moment of revelation determines this. Don't explain the effect as you reveal it. Pause. Let silence do the work. Then the single impossible fact, stated quietly. Quiet is louder than shouting." },
      { _key: 'pw-s4', stepNumber: 4, title: 'Script, Rehearse, Perform', instruction: "Write your patter word for word. Rehearse it until it sounds spontaneous. The moment it sounds scripted, audiences disengage. True scripting produces the illusion of improvisation." },
    ],
    commonMistakes: [
      { _key: 'pw-m1', mistake: 'Over-explaining', fix: "Don't tell the audience what just happened. They saw it. Silence is more powerful than commentary." },
      { _key: 'pw-m2', mistake: 'Talking during the secret move', fix: "Patter draws attention to you. If you're speaking while making a secret move, you're directing eyes to where the secret is happening." },
    ],
    practiceDrill: { title: 'One Trick, Six Openings', description: "Write six completely different opening lines for the same trick — different premise, different tone, different character. Perform each. Find the one that fits you.", reps: 'One writing session per trick in your repertoire' },
    performanceContext: "The best patter sounds like thinking out loud. It sounds like you're as surprised as the audience. Write toward that quality — even when you've performed the same routine 500 times.",
  },

  {
    _id: 'lesson-set-construction',
    _type: 'lesson',
    title: 'Set Construction',
    slug: { _type: 'slug', current: 'set-construction' },
    category: 'foundations',
    level: 'professional',
    tagline: 'Build a show that opens strong, builds tension, and ends breathtaking.',
    overview: "A set is a sequence of tricks performed together. The order, pacing, and emotional arc of your set determines whether you're merely impressive or truly unforgettable. Set construction is the least-taught and most important professional skill.",
    estimatedTime: 60,
    featured: false,
    order: 7,
    steps: [
      { _key: 'sc-s1', stepNumber: 1, title: 'The Opening Hook', instruction: "Your first trick must be fast, visual, and impossible. You have 15 seconds to establish credibility before your audience decides whether to engage. The opening needs no setup — it simply happens, it's impossible, and they're invested." },
      { _key: 'sc-s2', stepNumber: 2, title: 'The Middle Build', instruction: "The middle of a set gradually increases in impossibility and personal connection. Each trick should feel more impossible than the last. Use this section to involve the audience directly — names, choices, objects from pockets. Connection deepens investment." },
      { _key: 'sc-s3', stepNumber: 3, title: 'The Closer', instruction: "Your final trick is your most technically demanding, most emotionally powerful, and most impossible. It should leave the audience with a moment they will genuinely not be able to explain. Everything before the closer exists to prepare the audience emotionally for this moment." },
      { _key: 'sc-s4', stepNumber: 4, title: 'Pacing and Breathing', instruction: "Between tricks, pause. Let the audience process. Amateur performers rush from one trick to the next out of nervousness. Professionals create space — for applause, for the impossibility to sink in, for anticipation to build before the next effect begins." },
    ],
    commonMistakes: [
      { _key: 'sc-m1', mistake: 'Performing your best trick first', fix: 'An extraordinary opener is thrilling, but it sets a ceiling. If your second trick is weaker, the set deflates. Save your strongest work for the end.' },
      { _key: 'sc-m2', mistake: 'Too many tricks', fix: "Three perfect tricks are better than eight mediocre ones. Quality over quantity. A focused set of 3–5 tricks with strong patter and presence destroys a 15-trick marathon." },
    ],
    practiceDrill: { title: 'The Arc Map', description: "Draw a graph with time on the X-axis and audience emotional intensity on the Y-axis. Map your current set. It should rise steadily to a peak at the final trick. If it doesn't — restructure.", reps: 'Do this analysis after every practice run' },
    performanceContext: "A great set feels like a story, not a variety show. The audience should feel taken on a journey — surprised, delighted, astonished, and finally amazed. Structure the journey deliberately.",
  },

  {
    _id: 'lesson-performance-psychology',
    _type: 'lesson',
    title: 'Performance Psychology',
    slug: { _type: 'slug', current: 'performance-psychology' },
    category: 'foundations',
    level: 'professional',
    tagline: 'Manage your mind. The audience feels everything you feel.',
    overview: "Everything that happens inside a magician's mind during performance is transmitted to the audience — fear, confidence, delight, nervousness. The performer who understands and manages their internal state gives a fundamentally different performance than the one who doesn't.",
    estimatedTime: 45,
    featured: false,
    order: 8,
    steps: [
      { _key: 'pp-s1', stepNumber: 1, title: 'Managing Nerves', instruction: "Nervousness comes from caring about the outcome. That's good — it means you care. The problem is visible nervousness destroys audience confidence. Technique: before performing, deliberately slow your breathing to 4 counts in, 4 counts out. This physiologically reduces the stress response." },
      { _key: 'pp-s2', stepNumber: 2, title: 'Reading the Room', instruction: "Every audience is different. A corporate audience needs warmth before astonishment. A late-night crowd needs energy. Children need wonder. Learn to read energy within the first 60 seconds and adjust your approach — pacing, tone, choice of material — before you perform your first effect." },
      { _key: 'pp-s3', stepNumber: 3, title: "The Performer's Mindset", instruction: "The most important mindset shift: you are not trying to fool people. You are trying to give them an experience of genuine wonder. This reframe changes everything about your presence — from defensive concealment to generous performance." },
      { _key: 'pp-s4', stepNumber: 4, title: 'Recovering From Mistakes', instruction: "Mistakes happen. A visible miscue, a dropped card, a move that doesn't work. The audience remembers how you handle it, not that it happened. A confident, relaxed recovery — even with a joke — turns a mistake into a moment. Panic amplifies mistakes; composure erases them." },
    ],
    commonMistakes: [
      { _key: 'pp-m1', mistake: "Apologizing during performance", fix: "Never apologize mid-performance. It breaks the fiction and draws attention to the mechanism. If something goes wrong, act as if it's exactly what you intended." },
      { _key: 'pp-m2', mistake: 'Performing for other magicians in the room', fix: "Magicians are not your audience. Performing to impress them changes your priorities in ways the real audience can feel. Perform for the people who don't know what you're doing." },
    ],
    practiceDrill: { title: 'The Recording Review', description: "Record yourself performing your full set. Watch it back without sound first — only observing your body language, presence, and non-verbal communication. Then watch with sound. What do you see that you don't feel while performing?", reps: 'Every two weeks — track your evolution' },
    performanceContext: "The audience doesn't experience your technique. They experience your presence. Presence is a skill that can be developed — but only through honest self-assessment and deliberate practice under performance conditions.",
  },

  // ══════════════════════════════
  // SHUFFLES (8 lessons)
  // ══════════════════════════════

  {
    _id: 'lesson-overhand-shuffle',
    _type: 'lesson',
    title: 'Overhand Shuffle',
    slug: { _type: 'slug', current: 'overhand-shuffle' },
    category: 'shuffles',
    level: 'complete-beginner',
    tagline: "The world's most common shuffle. Now learn to control it.",
    overview: "The overhand shuffle is how most people in the world shuffle cards. It looks completely random — but in the hands of a magician, it's a precision control tool. You can maintain any card at the top, bottom, or any position in the deck with an overhand shuffle that looks completely fair.",
    estimatedTime: 15,
    featured: true,
    order: 1,
    steps: [
      { _key: 'os-s1', stepNumber: 1, title: 'The Basic Action', instruction: "Hold the deck in your left hand, face-down, held between thumb (near side) and fingers (far side). Your right hand grabs the bottom portion and pulls it upward and over. Your left thumb peels small packets off the top of the right-hand portion, dropping them onto the left-hand cards. Repeat.", cardAnimation: 'shuffle', fingerNote: "The right hand moves in a continuous arc — up and over. Don't stop and start. Fluid motion looks natural." },
      { _key: 'os-s2', stepNumber: 2, title: 'Controlling the Top Card', instruction: "To keep the top card on top throughout the shuffle: on your first action, your left thumb pulls just one card off the right-hand packet. Then shuffle all remaining cards on top of it. The 'one card' you pulled first stays on top the entire time.", fingerNote: "This 'pull one, dump the rest' action should look identical to a normal shuffle. The single card drop must be as casual as any other drop." },
      { _key: 'os-s3', stepNumber: 3, title: 'Controlling the Bottom Card', instruction: "To keep the bottom card at the bottom: shuffle normally until the last few cards remain in your right hand. Instead of dropping them onto the left-hand packet, undercut them — bring them to the bottom. The original bottom card never moves.", cardAnimation: 'cut' },
      { _key: 'os-s4', stepNumber: 4, title: 'The In-Jog Control', instruction: "When a spectator inserts a card, accept it with your left thumb but deliberately jog it inward about 1cm before continuing the shuffle. After one complete shuffle, you can find the jogged card by feel and cut directly to it.", fingerNote: "The jog must be subtle — 1cm max. You can feel it clearly but it's invisible under normal conditions.", cardAnimation: 'shuffle' },
    ],
    commonMistakes: [
      { _key: 'os-m1', mistake: 'Shuffling too slowly', fix: 'A slow shuffle looks deliberate. Match the rhythm of a normal, casual shuffle — which is actually quite fast.' },
      { _key: 'os-m2', mistake: 'Looking at the top card while controlling it', fix: "You don't need to see the top card — you're feeling it. Look at your spectator while you shuffle." },
    ],
    practiceDrill: { title: 'Ace Control', description: "Put all four Aces on top of the deck. Overhand shuffle 10 times. All four Aces should still be on top.", reps: '20 rounds — pass rate target: 18/20' },
    performanceContext: "The overhand shuffle is your most convincing 'fair' shuffle precisely because audiences do it themselves. When you offer to let them shuffle — and then offer to shuffle once more — they believe the deck is genuinely random. It isn't.",
  },

  {
    _id: 'lesson-hindu-shuffle',
    _type: 'lesson',
    title: 'Hindu Shuffle',
    slug: { _type: 'slug', current: 'hindu-shuffle' },
    category: 'shuffles',
    level: 'complete-beginner',
    tagline: 'Ancient, beautiful, deceptive — and the perfect cover for a force.',
    overview: "The Hindu shuffle is one of the oldest shuffling techniques in card magic, originating from South Asia. It's distinct from the overhand shuffle in its grip and action — and it enables an entirely different set of controls and forces.",
    estimatedTime: 15,
    featured: false,
    order: 2,
    steps: [
      { _key: 'hs-s1', stepNumber: 1, title: 'The Starting Grip', instruction: "Hold the deck horizontally in your right hand: thumb on the near long edge, middle and ring fingers on the far long edge. Your left hand approaches from below. Left thumb on one long edge, fingers on the other.", cardAnimation: 'shuffle', fingerNote: "The deck is held loosely in the right hand — it needs to be able to release packets freely." },
      { _key: 'hs-s2', stepNumber: 2, title: 'The Pull Action', instruction: "Your left hand pulls small packets from the top of the deck by pinching them between thumb and fingers, letting them fall onto your left palm. Your right hand stays stationary — the left hand does all the movement, repeatedly pulling and releasing small packets." },
      { _key: 'hs-s3', stepNumber: 3, title: 'Card Selection During Hindu', instruction: "During a Hindu shuffle, you can offer a spectator a free choice: 'Tell me to stop whenever you like.' When they say stop, you show the bottom card of the right-hand packet — a card you have positioned there in advance.", cardAnimation: 'reveal', fingerNote: "Position your target card before beginning. With practice, you'll time the shuffle to land on it consistently." },
      { _key: 'hs-s4', stepNumber: 4, title: 'Running the Shuffle', instruction: "For a convincing shuffle, vary the packet sizes you pull off each time. Consistent equal-sized packets look mechanical. Random variation looks natural." },
    ],
    commonMistakes: [
      { _key: 'hs-m1', mistake: 'Dropping cards', fix: 'Loosen your right hand grip and tighten the left hand pinch. The left hand should be actively taking cards, not waiting for them to fall.' },
      { _key: 'hs-m2', mistake: 'Shuffling too high above the left hand', fix: "Packets should fall just a centimetre or two. Large drops look dramatic but scatter cards and reduce control." },
    ],
    practiceDrill: { title: 'Stop Timing', description: "Place the Ace of Spades 15 cards from the top. Perform a Hindu shuffle and have a partner say stop — then show them the Ace.", reps: '30 attempts — track your success rate' },
    performanceContext: "The Hindu shuffle looks exotic and skillful to Western audiences. It reads as 'different' — which makes any force performed with it all the more convincing.",
  },

  {
    _id: 'lesson-table-riffle-shuffle',
    _type: 'lesson',
    title: 'Table Riffle Shuffle',
    slug: { _type: 'slug', current: 'table-riffle-shuffle' },
    category: 'shuffles',
    level: 'beginner',
    tagline: 'The casino standard. Master it — then secretly control it.',
    overview: "The table riffle shuffle is what most people picture when they think of 'proper' shuffling. Two halves riffled together on a table. It looks thoroughly random — but with practice, you can control where specific cards end up after the riffle, or maintain their position completely.",
    estimatedTime: 25,
    featured: false,
    order: 3,
    steps: [
      { _key: 'tr-s1', stepNumber: 1, title: 'Splitting the Deck', instruction: "Cut the deck into two approximately equal halves. Place them facing each other on the table, long edges touching. Both hands rest on top of their respective packets: thumbs at the inner short edges, fingers arching over the top.", cardAnimation: 'cut' },
      { _key: 'tr-s2', stepNumber: 2, title: 'The Riffle', instruction: "Simultaneously release cards from both halves — your thumbs walking back while releasing small packets of cards that interleave. The inner short edges of both halves should meet after the riffle. Then push the two halves together into one.", cardAnimation: 'shuffle', fingerNote: "The goal is interleaving — one card from the left, one from the right, alternating. Perfect interleaving is rare; small bunches are fine and look completely natural." },
      { _key: 'tr-s3', stepNumber: 3, title: 'The Bridge and Push', instruction: "After the riffle, arch the deck into a 'bridge' shape — fingers lifting the long edges while thumbs push down the middle. Then push the two halves together and the bridge collapses into a squared deck. This is the classic casino finish." },
      { _key: 'tr-s4', stepNumber: 4, title: 'False Riffle — Maintaining Top Stock', instruction: "The advanced technique: riffle the deck but release the top 10–12 cards last from your dominant thumb. These cards appear to interleave but actually all fall on top at the end. Your 'top stock' remains intact after an apparently fair shuffle.", fingerNote: "The timing of the release creates the false interleave. Practice until the sound and appearance are identical to a genuine riffle." },
    ],
    commonMistakes: [
      { _key: 'tr-m1', mistake: 'Uneven halves', fix: "Unequal halves look amateur. Cut exactly in half before riffling — the halves should look balanced." },
      { _key: 'tr-m2', mistake: 'Bending the cards excessively during the bridge', fix: "The bridge should be gentle. Aggressive arching damages cards and makes the sound of the un-bridge noticeably different from a fair shuffle." },
    ],
    practiceDrill: { title: 'Tabled Ace Control', description: "Put all four Aces on top. Perform a false riffle shuffle maintaining top stock. After three shuffles, all four Aces should be in the same position.", reps: '20 rounds — zero card loss' },
    performanceContext: "The table riffle shuffle is the most credible shuffle to lay audiences because they associate it with casinos and professional card handling. When you perform it confidently, they believe the deck is genuinely mixed.",
  },

  {
    _id: 'lesson-charlier-cut',
    _type: 'lesson',
    title: 'Charlier Cut',
    slug: { _type: 'slug', current: 'charlier-cut' },
    category: 'shuffles',
    level: 'intermediate',
    tagline: 'One-handed. Elegant. Unmistakably expert.',
    overview: "The Charlier cut is a one-handed cut that divides the deck into two packets and riffles them together — all in a single fluid motion. It's one of the most visually impressive sleights for onlookers who don't know card magic, and one of the most accessible advanced moves for beginners who do.",
    estimatedTime: 30,
    featured: false,
    order: 4,
    steps: [
      { _key: 'cc-s1', stepNumber: 1, title: 'The Starting Position', instruction: "Hold the deck in your right hand in a relaxed grip: thumb on the bottom long edge, four fingers along the top. The deck is face-down, parallel to the floor. Your index finger should curve slightly over the top face of the deck.", cardAnimation: 'cut' },
      { _key: 'cc-s2', stepNumber: 2, title: 'The Drop', instruction: "Your thumb releases pressure, allowing the bottom half of the deck to fall and hinge at your index finger. The bottom packet pivots downward away from the top packet, swinging out past the bottom of the top packet.", fingerNote: "The index finger is the hinge point — it doesn't move. Only the bottom packet falls." },
      { _key: 'cc-s3', stepNumber: 3, title: 'The Pass and Close', instruction: "Once the bottom packet has cleared the top packet, your index finger guides it upward — bringing it on top of the original top packet. The cut is complete: the bottom half is now on top, one-handed.", cardAnimation: 'shuffle', fingerNote: "The motion should be one continuous flow: release → fall → pass → close. No hesitation at any point." },
      { _key: 'cc-s4', stepNumber: 4, title: 'Building Fluency', instruction: "At full speed, the Charlier cut looks like a casual flourish. Practice until it takes less than 1 second. Then practice at half speed without losing smoothness. The ability to perform slowly and still look natural is the mark of true mastery." },
    ],
    commonMistakes: [
      { _key: 'cc-m1', mistake: 'Bottom packet not clearing the top before closing', fix: "The bottom packet must swing past the top packet entirely before the index finger guides it up. If it closes too early, it jams." },
      { _key: 'cc-m2', mistake: 'Gripping too tightly', fix: "The Charlier requires loose, relaxed fingers. Tight grip prevents the bottom packet from falling freely." },
    ],
    practiceDrill: { title: 'Charlier Chain', description: "Perform the Charlier cut 50 times in a row without dropping the deck or jamming. Count your failures — aim for zero.", reps: '50-rep chains, daily until failure rate hits zero' },
    performanceContext: "Use the Charlier cut as a visual bridge between tricks — during patter, while talking, as a casual gesture. When it looks effortless, it signals to your audience that your skills are extraordinary.",
  },

  {
    _id: 'lesson-faro-shuffle',
    _type: 'lesson',
    title: 'Faro Shuffle',
    slug: { _type: 'slug', current: 'faro-shuffle' },
    category: 'shuffles',
    level: 'advanced',
    tagline: 'Perfect mathematical order disguised as a shuffle.',
    overview: "The Faro shuffle — also called the perfect shuffle — interlaces two halves of the deck with absolute precision, one card at a time alternating. Eight perfect Faro shuffles return a deck to its original order. This mathematical property gives magicians extraordinary positional control over every card in the deck.",
    estimatedTime: 60,
    featured: false,
    order: 5,
    steps: [
      { _key: 'fa-s1', stepNumber: 1, title: 'Splitting Exactly in Half', instruction: "The Faro only works with perfectly equal halves — 26 cards each. Learn to cut the deck exactly in half by feel. Practice until you can do it within 1 card consistently.", cardAnimation: 'cut' },
      { _key: 'fa-s2', stepNumber: 2, title: 'The Weave', instruction: "Hold both halves facing each other, short edges nearly touching. Press the short edges together with gentle, even pressure. The corners will begin to interleave naturally — one card from each half alternating. Maintain consistent pressure and let the cards find each other.", cardAnimation: 'shuffle', fingerNote: "Don't force the weave. The cards interleave themselves when the pressure, angle, and half-sizes are all correct." },
      { _key: 'fa-s3', stepNumber: 3, title: 'In-Shuffle vs Out-Shuffle', instruction: "An 'out-shuffle' keeps the top and bottom cards of the deck in place — the outer cards don't move. An 'in-shuffle' brings the outer cards one position inward. Which you use determines the mathematical transformation applied to every card position." },
      { _key: 'fa-s4', stepNumber: 4, title: 'Practical Applications', instruction: "Eight out-shuffles return the deck to new-deck order. Four in-shuffles followed by four out-shuffles also restore order. You can use a known number of shuffles to bring any card to a known position — making the Faro the most powerful positional tool in card magic.", fingerNote: "Learn the Faro position chart: after N shuffles, which position does card at position X end up?" },
    ],
    commonMistakes: [
      { _key: 'fa-m1', mistake: 'Forcing the weave', fix: "Forcing damages cards. If they don't weave naturally, your halves aren't equal or your angle is wrong. Diagnose the issue, don't force it." },
      { _key: 'fa-m2', mistake: 'Losing track of in vs out', fix: "Mark a reference card position before practicing and check after each shuffle. Know which type you've performed before proceeding." },
    ],
    practiceDrill: { title: 'Eight Shuffle Restoration', description: "Memorize the top card. Perform eight perfect out-shuffles. It should be back on top. If not, identify at which shuffle the imperfection occurred.", reps: 'Daily until eight-shuffle restoration is consistent' },
    performanceContext: "The Faro shuffle looks extraordinary even to magicians. Performed visibly and slowly, it reads as a unique skill — the cards interlacing one by one. Many magicians use this visual alone as an effect.",
  },

  {
    _id: 'lesson-card-spring',
    _type: 'lesson',
    title: 'Card Spring',
    slug: { _type: 'slug', current: 'card-spring' },
    category: 'shuffles',
    level: 'intermediate',
    tagline: 'Cards cascading between your hands like a waterfall. Pure showmanship.',
    overview: "The card spring — springing the deck from one hand to the other in a cascade of cards — is the signature flourish of card magic. It requires no deception, has no direct utility in tricks, and is performed purely to demonstrate skill and showmanship. Audiences love it.",
    estimatedTime: 25,
    featured: false,
    order: 6,
    steps: [
      { _key: 'cs-s1', stepNumber: 1, title: 'The Grip', instruction: "Hold the deck in your right hand at the short edge: thumb on one end, fingers on the other. Arch the deck into a slight curve with pressure from both sides. The deck should want to spring outward.", cardAnimation: 'shuffle' },
      { _key: 'cs-s2', stepNumber: 2, title: 'Building the Pressure', instruction: "Increase the arch until the cards are under significant bowing pressure. Your thumb and fingers squeeze the short edges while pushing outward. The cards want to fly — you're holding them back.", fingerNote: "Start with light pressure to get the feel. Increase until the first card naturally pops off." },
      { _key: 'cs-s3', stepNumber: 3, title: 'The Release', instruction: "Position your left hand about 30cm below your right, cupped and ready to receive. Then release the pressure on the deck gradually and continuously from one end to the other. Cards shoot downward into your left hand in a stream.", fingerNote: "The key is gradual, consistent release. If you release all at once, cards go everywhere. If too slow, the spring dies mid-deck." },
      { _key: 'cs-s4', stepNumber: 4, title: 'Smoothing the Cascade', instruction: "The distance between your hands determines the length of the spring. Start with 15cm and gradually increase. The aesthetic goal is a tight, even cascade — cards landing in perfect sequential order in your receiving hand.", cardAnimation: 'reveal' },
    ],
    commonMistakes: [
      { _key: 'cs-m1', mistake: 'Cards going everywhere', fix: "You're releasing too fast and from too far away. Reduce distance to 10cm and slow the release significantly." },
      { _key: 'cs-m2', mistake: 'The spring dying halfway through', fix: "Insufficient initial pressure. The deck needs to be quite severely arched before the release begins." },
    ],
    practiceDrill: { title: 'The Distance Build', description: "Start with hands 10cm apart. Spring the deck cleanly. Add 2cm per session. Build to 40cm+ without dropping cards.", reps: 'Daily — track your maximum clean distance' },
    performanceContext: "Perform the spring as a visual opener before starting a routine, or as a reset between tricks. It signals: 'I have been practicing for years.' The sound alone — that cascade of cards — creates excitement.",
  },

  {
    _id: 'lesson-two-handed-cut',
    _type: 'lesson',
    title: 'Two-Handed Cut',
    slug: { _type: 'slug', current: 'two-handed-cut' },
    category: 'shuffles',
    level: 'beginner',
    tagline: 'The foundation of all false cuts and flourishes.',
    overview: "The two-handed cut is the basic action of dividing the deck into packets and reassembling them. Mastering the basic cut is a prerequisite for every false cut, swing cut, and flourish cut. It's also the most common action a spectator will ask to do — so you need to completely own it.",
    estimatedTime: 10,
    featured: false,
    order: 7,
    steps: [
      { _key: 'tc-s1', stepNumber: 1, title: 'The Standard Cut', instruction: "With the deck in dealer's grip in your left hand: your right hand lifts the top half off the deck and places it on the table. Then your left hand places the remaining bottom half on top of the tabled packet. The deck is now cut.", cardAnimation: 'cut' },
      { _key: 'tc-s2', stepNumber: 2, title: 'The Swing Cut', instruction: "Hold the deck in dealer's grip. Your right thumb and fingers grip the bottom half of the deck (the inner short edge). Swing the bottom half out to the right in a pendulum motion, then bring it on top of the left-hand packet. Smooth, one-handed elegance.", fingerNote: "The swing should be effortless — the packet rotates around your left thumb which acts as the pivot point." },
      { _key: 'tc-s3', stepNumber: 3, title: 'The Spectator Cut', instruction: "When you ask a spectator to cut the deck, you want them to cut to the middle — not too near the top or bottom where you have your controlled cards. Fan the deck toward them with a slight pause midway, and most spectators will cut near where the fan is most open." },
    ],
    commonMistakes: [
      { _key: 'tc-m1', mistake: "Unequal packet sizes", fix: "Practice cutting exactly in half every time. Equal packets look professional; wildly unequal packets look amateur." },
    ],
    practiceDrill: { title: 'Swing Cut Metronome', description: "Perform swing cuts to a metronome at 60bpm — one cut per beat. Build to 80bpm without dropping or fumbling.", reps: '50 cuts per session' },
    performanceContext: "The cut is the one action your audience trusts completely. They believe it randomises the deck. That trust is your most powerful resource — use it to make them believe something impossible has occurred.",
  },

  {
    _id: 'lesson-triple-cut',
    _type: 'lesson',
    title: 'Triple Cut',
    slug: { _type: 'slug', current: 'triple-cut' },
    category: 'shuffles',
    level: 'beginner',
    tagline: 'Three packets. Looks thorough. Controls everything.',
    overview: "The triple cut divides the deck into three packets and reassembles them. It looks more thorough than a single cut — audiences assume more mixing has occurred. In reality, a triple cut can be as controlled as a single cut, returning every card to exactly its original position.",
    estimatedTime: 15,
    featured: false,
    order: 8,
    steps: [
      { _key: 'tcut-s1', stepNumber: 1, title: 'The Three-Packet Split', instruction: "With the deck in your left hand, your right hand lifts a top third onto the table (A). Then your right hand lifts the middle third and places it next to the first (B). The remaining bottom third stays in your left hand (C). Three packets on the table.", cardAnimation: 'cut' },
      { _key: 'tcut-s2', stepNumber: 2, title: 'Reassembly — Fair Version', instruction: "Pick up packet C and place it on packet B. Then pick up the combined CB and place it on packet A. The deck is reassembled in the original order — despite three cuts!" },
      { _key: 'tcut-s3', stepNumber: 3, title: 'Reassembly — Controlled Version', instruction: "To bring a top-stocked card to the top after any triple cut: during reassembly, ensure the packet containing your controlled cards ends up on top. This requires knowing which third they're in after the split.", fingerNote: "With your cards at the top, you control which third they land in by controlling how much you lift off the first cut." },
    ],
    commonMistakes: [
      { _key: 'tcut-m1', mistake: 'Losing track of packet order', fix: "In practice, mark which packet is which with a small crimp or pencil dot. Once you've internalized the positions, remove the marker." },
    ],
    practiceDrill: { title: 'Ace Chase', description: "Put the Ace of Spades on top. Perform a triple cut. The Ace should return to the top. If it doesn't, identify which step lost it.", reps: '30 rounds, zero loss' },
    performanceContext: "Offer the spectator a 'choice' of which third they want to cut to. Then complete the cut — no matter which they choose — so their card is still found. The appearance of free choice makes the outcome seem impossible.",
  },

  // ══════════════════════════════
  // SLEIGHTS (9 lessons)
  // ══════════════════════════════

  {
    _id: 'lesson-pinky-break',
    _type: 'lesson',
    title: 'Pinky Break',
    slug: { _type: 'slug', current: 'pinky-break' },
    category: 'sleights',
    level: 'beginner',
    tagline: 'The invisible foundation. Without this, nothing else works.',
    overview: "The pinky break is a tiny gap maintained between two portions of the deck using the tip of your left little finger. It's invisible to spectators but tells you exactly where any card is in the deck. Almost every card control, force, and cut uses the pinky break as its foundation.",
    estimatedTime: 20,
    featured: true,
    order: 1,
    steps: [
      { _key: 'pb-s1', stepNumber: 1, title: 'Getting Into the Break', instruction: "Hold the deck in mechanic's grip. When a card is returned to the deck, your right thumb creates a tiny gap at the point of insertion. Your left pinky tip slips into this gap immediately as the right hand squares the card flush. The pinky tip rests against the right long edge of the lower packet.", fingerNote: "The break is taken at the INNER right corner of the deck — the corner closest to your palm. This is where the pinky naturally rests and is least visible.", cardAnimation: 'cut' },
      { _key: 'pb-s2', stepNumber: 2, title: 'Maintaining the Break', instruction: "A proper break requires virtually no effort. Your pinky tip is simply inserted — gravity and the weight of the upper packet do the work. You should be able to hold a break for several minutes without fatigue. If it hurts, you're gripping too hard.", fingerNote: "You only need 1–2mm of gap. Beginners often take breaks of 5–10mm which are visible. Smaller is better." },
      { _key: 'pb-s3', stepNumber: 3, title: 'The Break During Action', instruction: "The real test is maintaining the break while doing other things — talking, gesturing, even shuffling the top portion of the deck. Practice having a conversation while holding a break. You should be able to look someone in the eye and discuss the weather while your pinky holds your secret.", cardAnimation: 'shuffle' },
      { _key: 'pb-s4', stepNumber: 4, title: 'Converting a Break to a Control', instruction: "Once you have a break, you have the power to control that card anywhere. The most basic conversion: transfer the break to your right thumb, then perform a double undercut — two cuts that bring the card to the top of the deck.", fingerNote: "The break-to-control action should take under two seconds. Practice the timing until it feels like one single motion." },
    ],
    commonMistakes: [
      { _key: 'pb-m1', mistake: 'Taking too large a break', fix: 'A visible gap destroys the illusion. Less than 2mm. Feel it, don\'t see it.' },
      { _key: 'pb-m2', mistake: 'Looking at your hands while holding the break', fix: 'If you look, your audience looks. Train with a mirror so you can see your hands without directing attention to them.' },
      { _key: 'pb-m3', mistake: 'Tensing your entire hand', fix: 'Tension is visible. Your hand should look relaxed — only your pinky is doing any work.' },
    ],
    practiceDrill: { title: 'The Conversation Break', description: "Hold a break while having a full conversation with someone. They should have no idea. Time yourself — work up to 3 minutes without losing the break or being detected.", reps: 'Daily, 5-minute sessions — make it part of every practice' },
    performanceContext: "A pinky break is your most-used invisible tool. It should be so natural that you take one without thinking. Every card returned to the deck is an opportunity for a break.",
  },

  {
    _id: 'lesson-double-lift',
    _type: 'lesson',
    title: 'Double Lift',
    slug: { _type: 'slug', current: 'double-lift' },
    category: 'sleights',
    level: 'intermediate',
    tagline: 'Show one card, conceal another. The most-used sleight in all of card magic.',
    overview: "The double lift allows you to display the 'top card' of the deck while actually showing the second card. You turn two cards as one. This creates a reality gap that underpins hundreds of tricks — including the Ambitious Card, card stabbings, and virtually every card-to-pocket routine.",
    estimatedTime: 35,
    featured: true,
    order: 2,
    steps: [
      { _key: 'dl-s1', stepNumber: 1, title: 'Getting the Two-Card Break', instruction: "Before the double lift, you need a break under the top two cards. Classic method: your right thumb riffles the back edge of the deck from bottom to top — stopping to allow exactly two cards to fall. Your left pinky catches a break under those two cards.", fingerNote: "The riffle is performed as a casual gesture — like you're just thinking. Do it while looking at the spectator, not the deck.", cardAnimation: 'shuffle' },
      { _key: 'dl-s2', stepNumber: 2, title: 'The Turnover', instruction: "With the two-card break established, your right hand comes to the deck. Thumb at the inner short edge, index finger bent on top, remaining fingers at the outer short edge. Lift both cards as one, then pivot them face-up toward you, resting the face-up double on top of the deck.", fingerNote: "The cards must behave as one. Any bend, flex, or separation between the two cards kills the illusion.", cardAnimation: 'reveal' },
      { _key: 'dl-s3', stepNumber: 3, title: 'Showing the Card', instruction: "The double is now face-up on top of the deck, showing a card that isn't actually on top. Pause here. Let the audience see it. This is your moment of deception — the audience commits this 'top card' to memory. Then turn it face-down as a single unit.", fingerNote: "Don't rush this step. The longer the audience looks at the 'wrong' card, the more powerful the eventual reveal." },
      { _key: 'dl-s4', stepNumber: 4, title: 'Dealing the Real Top Card', instruction: "After turning the double down, deal the actual top card (which is different from what they saw). The audience believes you're dealing the card they just saw. This is the core deception.", cardAnimation: 'cut' },
    ],
    commonMistakes: [
      { _key: 'dl-m1', mistake: 'The two cards separating during the turnover', fix: "You need a cleaner break and lighter touch. The cards should be gripped at their long edge, not their corners." },
      { _key: 'dl-m2', mistake: 'The double "flapping" during the show', fix: "Keep a light grip on both cards throughout the display. They should move as a rigid unit." },
      { _key: 'dl-m3', mistake: 'Taking too long to get the break', fix: "The break should be taken in a single casual motion. If you're visibly 'working' the cards, alert spectators will notice." },
    ],
    practiceDrill: { title: 'Hundred Doubles', description: "Perform 100 double lifts in a row. Focus on smooth, consistent technique every single rep. Film the last 10 to assess how natural it looks.", reps: '100 lifts per session, 3 sessions per week minimum' },
    performanceContext: "The double lift is most powerful when the spectator is completely focused on something else. The double is performed in the background while attention is directed elsewhere.",
  },

  {
    _id: 'lesson-classic-palm',
    _type: 'lesson',
    title: 'Classic Palm',
    slug: { _type: 'slug', current: 'classic-palm' },
    category: 'sleights',
    level: 'advanced',
    tagline: 'Invisible concealment. The ultimate hide.',
    overview: "Classic palm allows you to hide a playing card completely in the natural curl of your hand. When done correctly, your hand looks perfectly natural and relaxed. No one suspects you're holding a card. It takes months of dedicated practice, but once mastered, it opens a completely new dimension of card magic.",
    estimatedTime: 60,
    featured: false,
    order: 3,
    steps: [
      { _key: 'cp-s1', stepNumber: 1, title: 'Understanding the Palm Position', instruction: "Relax your right hand naturally at your side. Notice the slight natural curl — your fingers aren't straight, and there's a concave space in your palm. This hollow is exactly where a playing card sits in the classic palm. The card is held by muscle tension, not finger contact.", fingerNote: "The card must not touch your fingers while palmed. It rests in the palm only. If your fingers are curled around it, it will be visible.", cardAnimation: 'reveal' },
      { _key: 'cp-s2', stepNumber: 2, title: 'Getting the Card Into Palm', instruction: "With the target card on top of the deck, your right hand approaches in a grip position. As your fingers contact the card, the heel of your palm pushes the card back while your fingers pull the deck away. The card pops into palm position in a fraction of a second.", cardAnimation: 'cut', fingerNote: "The motion must look identical to simply picking up the deck. The steal happens in the moment of contact — no hesitation." },
      { _key: 'cp-s3', stepNumber: 3, title: 'Natural Hand Position While Palming', instruction: "The test: stand in front of a mirror with a card palmed. Let your arm hang at your side. Can you see the card? Your hand should look completely natural. If you can see the edge of the card, your palm is too flat or your fingers too straight." },
      { _key: 'cp-s4', stepNumber: 4, title: 'Disposing of the Palmed Card', instruction: "The hardest part: getting the card out of palm without detection. Classic method — bring your hand back to the deck and push the palmed card onto the top in the same motion.", cardAnimation: 'shuffle', fingerNote: "Never dispose of a palmed card while someone is watching your hand. Misdirect their attention first." },
    ],
    commonMistakes: [
      { _key: 'cp-m1', mistake: 'Holding the palm too tightly', fix: "The card should be held by minimal tension. If your hand looks tense, reduce the grip pressure." },
      { _key: 'cp-m2', mistake: 'Rushing the steal', fix: "Paradoxically, the steal works better with slower, more deliberate hand movement — quicker movements create more visual disturbance." },
    ],
    practiceDrill: { title: 'The Natural Walk', description: "Palm a card. Walk across the room. Have a conversation. Gesture with your other hand. Your right hand should never draw attention.", reps: 'Daily 10-minute sessions — become comfortable with the card palmed' },
    performanceContext: "Classic palm enables card-to-pocket, card-to-wallet, and card-across routines — among the most powerful effects in card magic because they cause a card to appear somewhere it has no right to be.",
  },

  {
    _id: 'lesson-top-palm',
    _type: 'lesson',
    title: 'Top Palm',
    slug: { _type: 'slug', current: 'top-palm' },
    category: 'sleights',
    level: 'advanced',
    tagline: 'Steal the top card in one invisible motion. No one sees it leave.',
    overview: "The top palm allows you to steal the top card of the deck in a single fluid motion — completely covered by misdirection. The card goes from top of deck to palmed in under half a second. One of the most powerful steals in the art.",
    estimatedTime: 60,
    featured: false,
    order: 4,
    steps: [
      { _key: 'tp-s1', stepNumber: 1, title: 'The Natural Approach', instruction: "Your right hand comes to the deck in a natural squaring gesture — fingers across the top, thumb at the back edge. This is the cover action. From the audience's perspective, you're simply picking up or squaring the deck.", cardAnimation: 'cut' },
      { _key: 'tp-s2', stepNumber: 2, title: 'The Palm-Off', instruction: "As your right hand contacts the deck, the heel of your palm contacts the top card. Simultaneously, the fingers tip the front edge of the card upward slightly into the palm hollow. The card snaps into the classic palm position as your hand lifts off the deck.", fingerNote: "The snapping motion is initiated by the heel, not the fingers. The fingers provide a subtle guide, nothing more." },
      { _key: 'tp-s3', stepNumber: 3, title: 'The Follow-Through', instruction: "After the steal, your right hand continues its natural motion — moving away from the deck, gesturing, or setting the deck down. Never pause after the steal. The follow-through is the completion of the misdirection.", cardAnimation: 'shuffle', fingerNote: "The steal and follow-through are one continuous motion. Any hesitation destroys the illusion." },
    ],
    commonMistakes: [
      { _key: 'tp-m1', mistake: "The card snapping audibly", fix: "The snap means you're using too much tension. Reduce pressure until the steal is silent." },
      { _key: 'tp-m2', mistake: "Pausing after the steal", fix: "The pause is the tell. Keep moving. The follow-through action is as important as the steal itself." },
    ],
    practiceDrill: { title: 'The Continuous Steal', description: "Place the deck on the table. Walk past it, palm the top card as you pass, walk to the other side of the room, then come back and replace it as you pass again. Never pause.", reps: '30 passes per session' },
    performanceContext: "The top palm is used to secretly extract cards for card-to-impossible-location routines. A card signed by the spectator ends up in your wallet, in a sealed envelope, or inside a piece of fruit — because you palmed it and placed it there while they weren't looking.",
  },

  {
    _id: 'lesson-erdnase-colour-change',
    _type: 'lesson',
    title: 'Erdnase Colour Change',
    slug: { _type: 'slug', current: 'erdnase-colour-change' },
    category: 'sleights',
    level: 'advanced',
    tagline: 'One brush of the hand. One card becomes another. Pure visual magic.',
    overview: "Devised by S.W. Erdnase in his 1902 masterwork 'The Expert at the Card Table,' this colour change has never been surpassed. A card on top of the deck visually transforms into a completely different card in a single sweeping motion. The visual impact is breathtaking — audiences consistently gasp.",
    estimatedTime: 50,
    featured: false,
    order: 5,
    steps: [
      { _key: 'ec-s1', stepNumber: 1, title: 'The Setup', instruction: "Your target card (the card that will 'appear') is second from the top. The top card is the 'display' card — what the audience sees before the change. Establish a pinky break between the top two cards.", cardAnimation: 'reveal', fingerNote: "Casually display the top card before the change. The audience needs to 'register' it — give them a clear look." },
      { _key: 'ec-s2', stepNumber: 2, title: 'The Sweep', instruction: "Bring your right hand across the top of the deck from right to left in a smooth brushing motion. As your right hand covers the deck, your left thumb pushes the second card to the right, while your right palm secretly takes the first card away. Your right hand continues its sweep — leaving the second card face-up on top.", fingerNote: "The sweep should look completely unrelated to the card change. It should look like a gesture — like you're fanning away smoke.", cardAnimation: 'shuffle' },
      { _key: 'ec-s3', stepNumber: 3, title: 'The Speed', instruction: "The change happens during the sweep — not before it, not after it. The timing must be exact. Too early and the audience sees two cards. Too late and they see you fumbling. The cards change at the exact moment your palm covers them." },
    ],
    commonMistakes: [
      { _key: 'ec-m1', mistake: 'Watching your own hands', fix: "Look at your spectator's face during the change. Their reaction tells you it worked." },
      { _key: 'ec-m2', mistake: 'Making the sweep too deliberate', fix: "The sweep should look like a thoughtless gesture. The less purposeful it looks, the more impossible the change seems." },
    ],
    practiceDrill: { title: 'Mirror Work', description: "Perform the Erdnase change in front of a mirror, eyes on your own eyes — not your hands. If you can see the switch, so can they.", reps: '60 reps per session, mirror only' },
    performanceContext: "Use the Erdnase as a punctuation mark in a routine — a single visual exclamation that caps a sequence. It's too powerful to use casually. Save it for the moment when you want the room to gasp.",
  },

  {
    _id: 'lesson-second-deal',
    _type: 'lesson',
    title: 'Second Deal',
    slug: { _type: 'slug', current: 'second-deal' },
    category: 'sleights',
    level: 'professional',
    tagline: 'Deal the second card while appearing to deal the top. The professional\'s weapon.',
    overview: "The second deal allows you to deal the second card from the deck while appearing to deal the top card. The top card — which you control — never leaves its position. This enables you to deal any card you want at any time while the deck appears untouched.",
    estimatedTime: 120,
    featured: false,
    order: 6,
    steps: [
      { _key: 'sd-s1', stepNumber: 1, title: 'The Push-Off Second', instruction: "Your left thumb pushes the top card to the right, exposing the second card. Your right fingers go under the second card (not the top card) and deal it to the table. The top card is pushed back to its original position immediately afterward.", fingerNote: "The push-off and replacement of the top card is the heart of the move. It must happen in a fraction of a second.", cardAnimation: 'cut' },
      { _key: 'sd-s2', stepNumber: 2, title: 'The Synchronisation', instruction: "The second deal looks like a normal deal from every angle when the timing is perfect. The top card pushes off and returns while the right hand takes the second card — all in the time a normal deal takes. Practice the synchronisation until it's completely automatic." },
      { _key: 'sd-s3', stepNumber: 3, title: 'The Strike Second', instruction: "An alternative technique: instead of the push-off, the right fingers strike the second card directly while the left thumb holds the top card back. Faster and sharper-looking, but harder to master.", cardAnimation: 'shuffle', fingerNote: "The strike second sounds slightly different from a normal deal. Work to make the sound identical." },
    ],
    commonMistakes: [
      { _key: 'sd-m1', mistake: 'The top card flashing', fix: "The top card must return to its original position before the right hand has moved away. Even a millisecond of exposure is visible." },
      { _key: 'sd-m2', mistake: 'A different sound than a normal deal', fix: "Audio is as important as visual. The sound of a second deal should be identical to a normal deal. Work with closed eyes sometimes — listen only." },
    ],
    practiceDrill: { title: 'Forty Consecutive Seconds', description: "Deal an entire deck, dealing seconds throughout. Every card should be the second — never accidentally the top. Perfect deal sounds and looks.", reps: '40-card sequences, three times per session' },
    performanceContext: "The second deal is the most used tool in gambling demonstrations — demonstrating the impossibility of gambling against a skilled cheat. Used in performance, it's the engine behind 'impossible' poker hands.",
  },

  {
    _id: 'lesson-bottom-deal',
    _type: 'lesson',
    title: 'Bottom Deal',
    slug: { _type: 'slug', current: 'bottom-deal' },
    category: 'sleights',
    level: 'professional',
    tagline: 'Deal from the bottom while appearing to deal from the top. The cheat\'s secret.',
    overview: "The bottom deal allows you to deal the bottom card of the deck at will while appearing to deal normally from the top. Card cheats have used it for centuries to deal themselves winning hands. In performance, it enables effects that seem physically impossible.",
    estimatedTime: 120,
    featured: false,
    order: 7,
    steps: [
      { _key: 'bd-s1', stepNumber: 1, title: 'The Grip', instruction: "The bottom deal requires a specific grip that allows access to the bottom card. Your left fingers curl around the deck, with your left little finger resting against the bottom card. Your right hand comes over the deck as in a normal deal.", fingerNote: "The grip must look identical to a normal dealing grip. Any change in grip before the deal telegraphs the cheat.", cardAnimation: 'cut' },
      { _key: 'bd-s2', stepNumber: 2, title: 'The Pull-Through', instruction: "As your right hand approaches for a deal, your left little finger pulls the bottom card slightly to the right — creating a gap. The right fingers enter this gap and carry the bottom card away as a deal, while the top of the deck is untouched.", cardAnimation: 'shuffle' },
      { _key: 'bd-s3', stepNumber: 3, title: 'Cover and Misdirection', instruction: "The cover action — your right hand coming over the deck — naturally blocks the view of the bottom card leaving. The deal should look like any other deal from any angle. Test from above, from the side, and from in front.", fingerNote: "The misdirection is built into the action itself — the cover is a natural part of the dealing motion, not added." },
    ],
    commonMistakes: [
      { _key: 'bd-m1', mistake: 'A different-sounding deal', fix: "The bottom deal often sounds slightly different — a softer take, a slight brushing sound. Eliminate these audio tells." },
      { _key: 'bd-m2', mistake: 'Gripping too tightly', fix: "A tight grip makes the bottom card difficult to move. Loosen the entire hand — control, don't clamp." },
    ],
    practiceDrill: { title: 'The Poker Deal', description: "Deal a five-handed game of poker, giving yourself the bottom card on every deal. End with a royal flush. Then reverse — deal seconds to yourself, bottom to others.", reps: 'Full 5-handed deals, 20 minutes per session' },
    performanceContext: "The bottom deal is most powerful in gambling demonstrations. Explain that card cheats exist — then demonstrate exactly how they operate. The audience understands the impossible poker hand because they just watched you explain, and demonstrate, the deception.",
  },

  {
    _id: 'lesson-pass',
    _type: 'lesson',
    title: 'The Pass',
    slug: { _type: 'slug', current: 'the-pass' },
    category: 'sleights',
    level: 'professional',
    tagline: 'Teleport any card to any position. Invisibly, silently, instantly.',
    overview: "The pass is the technique of secretly transposing the two halves of the deck in a single, invisible motion. It allows you to instantly bring any card from any position in the deck to the top — without a cut, without a shuffle, apparently without any action at all. It is the most difficult and most powerful sleight in card magic.",
    estimatedTime: 180,
    featured: false,
    order: 8,
    steps: [
      { _key: 'pa-s1', stepNumber: 1, title: 'The Break', instruction: "A pass begins with a pinky break. The entire move is a way to take advantage of that break — using it as the pivot point for the transposition.", cardAnimation: 'cut' },
      { _key: 'pa-s2', stepNumber: 2, title: 'The Classic Pass', instruction: "Your right hand comes over the deck in a squaring gesture. Under cover of the right hand, your left fingers roll the lower packet inward and upward — while your right hand's fingers guide the upper packet below it. The two halves switch positions completely.", fingerNote: "The move happens under the right hand's cover. It should take less than one second from start to finish.", cardAnimation: 'shuffle' },
      { _key: 'pa-s3', stepNumber: 3, title: 'The Timing', instruction: "The pass must be performed at a moment of attention break — as you ask a question, as you look away, as the spectator picks up their card. The misdirection is everything. The technique is secondary to the timing." },
      { _key: 'pa-s4', stepNumber: 4, title: 'Years of Practice', instruction: "The pass is the technique that separates serious card magicians from casual performers. It cannot be learned in a week or a month. Expect to practice it for six months to a year before it begins to look clean — and another year before it becomes truly invisible.", fingerNote: "Practice slowly. The pass done slowly and smoothly is more invisible than a fast, sloppy pass." },
    ],
    commonMistakes: [
      { _key: 'pa-m1', mistake: 'Rushing the pass', fix: "A fast, aggressive pass creates visual disturbance. Slow, deliberate, and under cover is more deceptive." },
      { _key: 'pa-m2', mistake: 'Performing without misdirection', fix: "The pass alone is not sufficient. The combination of pass + perfect misdirection timing is what makes it invisible." },
    ],
    practiceDrill: { title: 'Daily Hundred', description: "One hundred passes per day, minimum. Not in front of a mirror — just building muscle memory. The pass must become as natural as breathing before it can be performed.", reps: '100 per day, every day, for at least six months' },
    performanceContext: "When the pass is truly mastered, it changes your entire performance approach. You can now control any card at any time without any visible action. This freedom transforms every trick you know.",
  },

  // ══════════════════════════════
  // CONTROLS (9 lessons)
  // ══════════════════════════════

  {
    _id: 'lesson-key-card-control',
    _type: 'lesson',
    title: 'Key Card Control',
    slug: { _type: 'slug', current: 'key-card-control' },
    category: 'controls',
    level: 'beginner',
    tagline: 'The simplest and most reliable card location in existence.',
    overview: "A key card is a card whose identity you know — placed adjacent to a spectator's chosen card. After any shuffle, you simply look through the deck for your key card, and their chosen card is right next to it. No sleight of hand required. This is the foundation of beginner card magic.",
    estimatedTime: 20,
    featured: true,
    order: 1,
    steps: [
      { _key: 'kc-s1', stepNumber: 1, title: "Establishing Your Key Card", instruction: "Before showing the deck, secretly glimpse the bottom card. This is your key card. Spread the deck face-down and ask a spectator to take any card. While they look at their card, control the deck so your key card is directly above where their card will be returned.", cardAnimation: 'fan', fingerNote: "Glimpsing the bottom card is easy during a casual cut or square. Glance at it naturally, as if checking the deck." },
      { _key: 'kc-s2', stepNumber: 2, title: 'The Return', instruction: "Ask the spectator to place their card back in the deck. Have them place it on top of the bottom half, then drop the top half on top — your key card is now directly above theirs.", cardAnimation: 'cut' },
      { _key: 'kc-s3', stepNumber: 3, title: 'Finding the Card', instruction: "Shuffle the deck (or hand it to them to shuffle). Then spread through the face-up deck looking for your key card. The chosen card is immediately below. You now know exactly what it is and where it is.", cardAnimation: 'reveal', fingerNote: "Look for your key card at a natural pace — scanning the deck with apparent concentration. Don't rush. Build theatrical tension." },
    ],
    commonMistakes: [
      { _key: 'kc-m1', mistake: 'Losing the key card during a shuffle', fix: "For beginners, use a cut instead of a shuffle. Once you've learned overhand shuffle controls, you can maintain the key pair through shuffles." },
      { _key: 'kc-m2', mistake: 'Revealing too quickly', fix: "Use the search time to build drama. Pretend to struggle before finding it. The reveal is more powerful with tension." },
    ],
    practiceDrill: { title: 'Key Card Chain', description: "Have five different people each 'choose' a card. Locate all five using key cards set before each selection. Perform this as a single routine — five impossible revelations in a row.", reps: '10 complete run-throughs — zero errors' },
    performanceContext: "Key card is your safety net. Even if another technique fails mid-performance, a secretly known key card can salvage almost any trick. Never perform without one established.",
  },

  {
    _id: 'lesson-double-undercut',
    _type: 'lesson',
    title: 'Double Undercut',
    slug: { _type: 'slug', current: 'double-undercut' },
    category: 'controls',
    level: 'beginner',
    tagline: 'Two cuts that secretly bring any card to the top.',
    overview: "The double undercut uses two cuts to secretly bring a card from anywhere in the deck to the top — all while looking like a casual, fair-seeming cut. It's the most common method for controlling a card after a break is established. Once learned, it becomes completely automatic.",
    estimatedTime: 25,
    featured: false,
    order: 2,
    steps: [
      { _key: 'du-s1', stepNumber: 1, title: 'Establish the Break', instruction: "You need a pinky break above the target card. Classic scenario: a spectator returns a card to the middle of the deck, and you've secured a pinky break above it.", cardAnimation: 'cut', fingerNote: "The break is at the inner right corner — only you can feel it. From the front, the deck looks perfectly squared." },
      { _key: 'du-s2', stepNumber: 2, title: 'First Undercut', instruction: "Transfer the break to your right thumb. Your right hand now holds the upper portion. Your left hand takes the lower portion and moves it to the top — a 'cut' of the bottom section to the top. Now the target card is second from the top.", fingerNote: "This should look like a slow, deliberate, transparent cut. That's exactly what makes it convincing.", cardAnimation: 'shuffle' },
      { _key: 'du-s3', stepNumber: 3, title: 'Second Undercut', instruction: "Immediately take approximately half the deck from the bottom and move it to the top again. This second cut completes the control — your target card is now on top.", cardAnimation: 'cut' },
    ],
    commonMistakes: [
      { _key: 'du-m1', mistake: 'Making the cuts too equal', fix: "Two perfectly equal cuts look mechanical. Vary the packet sizes on each cut to match how a casual person cuts cards." },
      { _key: 'du-m2', mistake: 'Pausing between cuts', fix: "Both cuts should flow in one continuous motion. Pause = thinking = suspicion." },
    ],
    practiceDrill: { title: 'Invisible Top', description: "Perform the double undercut 50 times, then check: is your target card actually on top? After 50 reps, record yourself and watch for any telegraphing.", reps: '50 reps per session' },
    performanceContext: "The double undercut is your go-to control when you want to 'show' the spectator that you're cutting cards fairly. Offer to cut once — do both cuts quickly — and their card is on top.",
  },

  {
    _id: 'lesson-hindu-force',
    _type: 'lesson',
    title: 'Hindu Force',
    slug: { _type: 'slug', current: 'hindu-force' },
    category: 'controls',
    level: 'intermediate',
    tagline: "Free choice? That's what they think.",
    overview: "The Hindu force uses the rhythm of the Hindu shuffle to force a specific card onto a spectator. They believe they stopped you freely — in reality, you've predetermined exactly which card they'll see. It's the cleanest, most natural-feeling force in card magic.",
    estimatedTime: 30,
    featured: false,
    order: 3,
    steps: [
      { _key: 'hf-s1', stepNumber: 1, title: 'Positioning the Force Card', instruction: "Your force card must be on top of the deck before you begin. Establish this secretly before approaching your audience.", cardAnimation: 'cut', fingerNote: "The force card on top is completely hidden. The audience sees only the back of the top card during the shuffle." },
      { _key: 'hf-s2', stepNumber: 2, title: 'The Shuffle and the Stop', instruction: "Begin a Hindu shuffle. Ask the spectator to say 'stop' whenever they like. As they say stop, you freeze — showing them the bottom card of the right-hand packet. No matter when they say stop, you ensure the force card is the one shown.", cardAnimation: 'shuffle', fingerNote: "You have more control than you think. If they say stop too early, continue for one more pull before 'registering' the stop." },
      { _key: 'hf-s3', stepNumber: 3, title: 'The Grace Period', instruction: "You have approximately a half-second grace period between when the spectator says stop and when you actually stop. This is enough time to complete one more pull if needed.", cardAnimation: 'reveal' },
    ],
    commonMistakes: [
      { _key: 'hf-m1', mistake: 'Forcing too mechanically', fix: "If you stop at exactly the same point every time, a sharp observer will notice the pattern. Vary your shuffle rhythm while always landing on the force card." },
    ],
    practiceDrill: { title: 'Ten-Person Force', description: "Force the Ace of Spades on ten different people in a row, letting each of them say stop freely. Perfect score is 10/10.", reps: '10-person sessions until you hit 10/10 three times running' },
    performanceContext: "The Hindu force works best when you appear casual about it — like you genuinely don't care when they stop. Nonchalance is your strongest weapon.",
  },

  {
    _id: 'lesson-swing-cut-force',
    _type: 'lesson',
    title: 'Swing Cut Force',
    slug: { _type: 'slug', current: 'swing-cut-force' },
    category: 'controls',
    level: 'intermediate',
    tagline: 'A visual force disguised as a simple cut.',
    overview: "Using the swing cut action, you control which card the spectator sees and takes. The bottom half of the deck swings open and the top card of the lower packet is offered — a card you have positioned there in advance. Looks completely natural from every angle.",
    estimatedTime: 25,
    featured: false,
    order: 4,
    steps: [
      { _key: 'sf-s1', stepNumber: 1, title: 'Positioning the Force Card', instruction: "Your force card is on top of the bottom half of the deck — positioned there during a previous shuffle or cut. This is the card that will be 'freely chosen.'", cardAnimation: 'cut' },
      { _key: 'sf-s2', stepNumber: 2, title: 'The Swing Cut Action', instruction: "Hold the deck in dealer's grip. Your right hand lifts the top half slightly while the bottom half swings outward on the pivot of your left thumb. The top card of the bottom half is now displayed — this is the force card.", fingerNote: "The swing is casual and smooth. It should look exactly like a careless cut, not a deliberate offer.", cardAnimation: 'shuffle' },
      { _key: 'sf-s3', stepNumber: 3, title: 'The Offer', instruction: "Ask the spectator to take the top card of the swung-open bottom half. They believe they stopped you at a random point — in reality, they've taken exactly the card you placed there.", cardAnimation: 'reveal', fingerNote: "Look at the spectator, not the deck, as you make the offer. Your confidence in the force is what sells it." },
    ],
    commonMistakes: [
      { _key: 'sf-m1', mistake: "The force card not being in position", fix: "If the force card isn't exactly on top of the bottom half, the wrong card is offered. Check your setup before every performance." },
      { _key: 'sf-m2', mistake: "Hesitating during the swing", fix: "A hesitation suggests something is happening. The swing is one fluent motion from start to offer." },
    ],
    practiceDrill: { title: 'Swing Force Consistency', description: "Force the same card (the Ace of Spades) on 20 volunteers. Every single one should receive the Ace. Track failures and identify the cause.", reps: '20 consecutive successes — zero failures' },
    performanceContext: "The swing cut force is ideal for tricks where the spectator 'freely' chooses a card that you already know. It's most convincing when performed as a side action while you're talking — not as the main focus.",
  },

  {
    _id: 'lesson-riffle-force',
    _type: 'lesson',
    title: 'Riffle Force',
    slug: { _type: 'slug', current: 'riffle-force' },
    category: 'controls',
    level: 'beginner',
    tagline: 'Stop anywhere. The card is always theirs to take.',
    overview: "The riffle force is the simplest and most deceptive force in card magic. You riffle through the deck and ask the spectator to say stop — they stop you at a card you've placed there in advance. It requires only a basic shuffle skill and exceptional timing.",
    estimatedTime: 20,
    featured: false,
    order: 5,
    steps: [
      { _key: 'rf-s1', stepNumber: 1, title: 'The Setup', instruction: "Your force card is on top of the deck. Before riffling, establish this secretly. The riffle force works by controlling where the riffle pauses — not by having the card at a specific depth.", cardAnimation: 'cut' },
      { _key: 'rf-s2', stepNumber: 2, title: 'The Riffle', instruction: "Hold the deck from above in your left hand, face-down. Your right thumb riffles upward through the back edge of the deck while you ask the spectator to say stop. When they stop you, your left thumb opens the front of the deck at that point — but the card shown is the force card, not the random card at that position.", fingerNote: "The sleight happens in the left hand, not the right. The right hand riffles to create the illusion of randomness.", cardAnimation: 'shuffle' },
      { _key: 'rf-s3', stepNumber: 3, title: 'The Force Moment', instruction: "At the moment of 'stop,' your left fingers open the deck so the force card is at the position shown. This requires split-second coordination between the right thumb stopping and the left hand opening to the right place.", cardAnimation: 'reveal' },
    ],
    commonMistakes: [
      { _key: 'rf-m1', mistake: 'Stopping too late', fix: "If you riffle too far before the spectator says stop, the force card may already have passed. Start the riffle slowly and speed up — giving yourself more time to react." },
    ],
    practiceDrill: { title: 'Forced Stop', description: "Practice the riffle force alone, calling 'stop' yourself at random times and checking if the force card is always shown. Aim for 100% accuracy.", reps: '50 self-directed reps per session' },
    performanceContext: "The riffle force has one of the highest perceived freedom values of any force — the spectator physically stops you. That sense of physical control over their choice is extremely convincing.",
  },

  {
    _id: 'lesson-dribble-force',
    _type: 'lesson',
    title: 'Dribble Force',
    slug: { _type: 'slug', current: 'dribble-force' },
    category: 'controls',
    level: 'intermediate',
    tagline: 'Cards cascade. They stop you. Their card appears.',
    overview: "The dribble force uses the action of cards cascading from hand to hand. The spectator asks you to stop anywhere in the stream of falling cards — and the card shown at that moment is the force card. Visually dynamic and beautifully deceptive.",
    estimatedTime: 25,
    featured: false,
    order: 6,
    steps: [
      { _key: 'df-s1', stepNumber: 1, title: 'The Dribble Action', instruction: "Hold the deck in your right hand at the short edge, as for the card spring. Allow cards to dribble off your fingers into your waiting left hand. The stream of cards is continuous and even — a waterfall of cards.", cardAnimation: 'shuffle', fingerNote: "Control the speed of the dribble with finger pressure. Slower streams give you more reaction time for the force." },
      { _key: 'df-s2', stepNumber: 2, title: 'The Stop', instruction: "Ask the spectator to say stop while cards dribble. When they do, you freeze — catching whatever cards remain in your right hand while the left holds the dribbled cards. The top card of the left-hand packet (the last card to fall) is shown." },
      { _key: 'df-s3', stepNumber: 3, title: 'Controlling the Stop', instruction: "Your force card is at a specific position in the deck. As you dribble, you're counting cards or using feel to know when the force card is about to fall. The moment it does fall, you're 'ready to stop' — when the spectator calls, you've just landed on it.", cardAnimation: 'reveal', fingerNote: "The force works best if the spectator stops you when the stream has about half-fallen. Ask them to stop you 'somewhere in the middle.'" },
    ],
    commonMistakes: [
      { _key: 'df-m1', mistake: 'Dribbling too fast', fix: "A fast dribble gives you no reaction time. Slow the stream to give yourself the ability to time the stop." },
    ],
    practiceDrill: { title: 'Dribble Position', description: "Mark the force card's position with a crimp. Dribble the deck and try to stop exactly at the crimp — feeling its position as it falls. Remove the crimp only when you can stop at that position consistently.", reps: '40 reps per session' },
    performanceContext: "The dribble force is visually impressive — cards falling in a stream is inherently engaging. Using the force in this context disguises the technical control completely behind the spectacle.",
  },

  {
    _id: 'lesson-glimpse',
    _type: 'lesson',
    title: 'The Glimpse',
    slug: { _type: 'slug', current: 'the-glimpse' },
    category: 'controls',
    level: 'beginner',
    tagline: "Know their card without them knowing you know. The simplest secret.",
    overview: "The glimpse is the act of secretly seeing a card's identity — usually a chosen card or a key card — without the spectator being aware. It's not a move in the traditional sense; it's a skill of deception through naturalness.",
    estimatedTime: 15,
    featured: false,
    order: 7,
    steps: [
      { _key: 'gl-s1', stepNumber: 1, title: 'The Bottom Glimpse', instruction: "As you square the deck or cut it, briefly turn it sideways toward you — your body naturally shields the action. The bottom card is momentarily visible to you. This is the most casual and reliable glimpse.", fingerNote: "The square should look like a habitually thorough square. Adding the tilt is natural — you're just making sure the deck is aligned." },
      { _key: 'gl-s2', stepNumber: 2, title: 'The Top Glimpse', instruction: "Slightly bow the deck as you take it into dealing grip. The top card briefly bends upward, showing its face to you and only you. Then relax the bow as you settle the grip.", cardAnimation: 'cut', fingerNote: "The bow of the top glimpse must be subtle — a millimetre is enough. Any obvious bending draws attention." },
      { _key: 'gl-s3', stepNumber: 3, title: 'The Spread Glimpse', instruction: "While spreading the deck face-down for a selection, briefly turn the deck slightly sideways — revealing the bottom card to yourself. Audience sees only the backs of the spread cards.", cardAnimation: 'fan' },
    ],
    commonMistakes: [
      { _key: 'gl-m1', mistake: 'Reacting after the glimpse', fix: "Your expression must not change when you glimpse. Practice in a mirror — watch for any micro-expression shift when you see the card." },
    ],
    practiceDrill: { title: 'Poker Face Glimpse', description: "Glimpse the bottom card while maintaining a natural expression and continuing to talk. Have a partner watch your face — they should never detect the moment of knowing.", reps: 'Practice with a live observer, 20 sessions' },
    performanceContext: "The glimpse is your most versatile secret. Combined with any patter about 'reading minds' or 'knowing what you're thinking,' it becomes the invisible engine behind an apparently impossible revelation.",
  },

  {
    _id: 'lesson-injog-shuffle',
    _type: 'lesson',
    title: 'Injog Shuffle Control',
    slug: { _type: 'slug', current: 'injog-shuffle' },
    category: 'controls',
    level: 'intermediate',
    tagline: "Shuffle the deck. Their card never moves.",
    overview: "The injog shuffle allows you to control a card to any position during a shuffle — while the shuffle looks completely genuine. A single injogged card (displaced 1cm from the pack) acts as a reference point that lets you cut directly to it after the shuffle is complete.",
    estimatedTime: 30,
    featured: false,
    order: 8,
    steps: [
      { _key: 'is-s1', stepNumber: 1, title: 'Taking the Injog', instruction: "When a spectator returns their card, accept it with your left thumb in a normal overhand shuffle action — but deliberately jog it 1cm toward you (inward) as you drop it. Continue shuffling normally. From the front, nothing unusual is visible.", fingerNote: "The jog must be a consistent 1cm — just enough to feel, not enough to see from the front.", cardAnimation: 'shuffle' },
      { _key: 'is-s2', stepNumber: 2, title: 'Maintaining the Jog Through Shuffling', instruction: "After the injog, you can continue shuffling freely. The injogged card stays in its jogged position through multiple shuffle cycles — as long as you don't shuffle packets over it from that side." },
      { _key: 'is-s3', stepNumber: 3, title: 'Cutting to the Jog', instruction: "After shuffling, run your right thumb along the near short edge of the deck. You'll feel the injogged card as a slight bump. Cut directly at that point — the controlled card is now on top.", cardAnimation: 'cut', fingerNote: "The cut to the jog should look like a casual cut. Run your thumb as if simply picking up the deck." },
    ],
    commonMistakes: [
      { _key: 'is-m1', mistake: 'Jog visible from the front', fix: "A visible jog exposes the whole method. 1cm is the maximum. If in doubt, use less." },
      { _key: 'is-m2', mistake: 'Losing the jog during shuffling', fix: "The jog is maintained by shuffling over and under it — never through it. Once lost, it can't be recovered. Practice identifying the jog by touch before performing." },
    ],
    practiceDrill: { title: 'Jog Finder', description: "Injog a card at a random point in the deck. Perform three complete overhand shuffles. Then close your eyes and find the jog by touch alone — cut to it and check if the controlled card is on top.", reps: '30 rounds — eyes-closed' },
    performanceContext: "The injog shuffle is most convincing when you let the spectator shuffle the deck themselves after the injog is set. They believe the deck is genuinely randomized — and your controlled card survives their shuffle.",
  },

  {
    _id: 'lesson-ambitious-card',
    _type: 'lesson',
    title: 'Ambitious Card Routine',
    slug: { _type: 'slug', current: 'ambitious-card' },
    category: 'controls',
    level: 'intermediate',
    tagline: "No matter where you put it, it rises to the top. Every. Single. Time.",
    overview: "The Ambitious Card is arguably the most popular close-up card routine in the world — a chosen card that repeatedly rises to the top of the deck no matter how deeply it's buried. It's a complete routine built from multiple controls and techniques, and it plays to the very top of professional skill levels.",
    estimatedTime: 45,
    featured: true,
    order: 9,
    steps: [
      { _key: 'ac-s1', stepNumber: 1, title: 'The Structure', instruction: "The Ambitious Card is a routine, not a single trick. It consists of multiple 'phases' — each time the card rises, it should use a different technique and feel impossibly more impossible than the last. A complete Ambitious Card routine has 4–7 phases.", cardAnimation: 'fan' },
      { _key: 'ac-s2', stepNumber: 2, title: 'Phase 1 — Simple Control', instruction: "The first rise uses your simplest control (double undercut or key card). This establishes the premise and gives the audience a result they almost believe could be accidental. Keep it simple — set up the impossibility to come.", cardAnimation: 'cut' },
      { _key: 'ac-s3', stepNumber: 3, title: 'Phase 2 — Visual Rise', instruction: "The second phase is more visual — the card rises while inserted into the middle with the deck held vertically, or rises out of the spread face-up on the table. Same trick; harder to explain.", cardAnimation: 'reveal', fingerNote: "The visual rise can use a double lift followed by a deal — the audience sees their card on top because you show two cards as one." },
      { _key: 'ac-s4', stepNumber: 4, title: 'Final Phase — The Impossible', instruction: "The final rise should feel genuinely impossible. The card is pushed into the middle, the deck is tossed, shuffled, or given to the spectator — and somehow it's still on top. Use your best technique here. The final phase is the one they'll remember.", cardAnimation: 'shuffle', fingerNote: "The gap between the second-to-last and last phases should feel like a step change in impossibility. Make the finale unmistakably impossible." },
    ],
    commonMistakes: [
      { _key: 'ac-m1', mistake: 'Using the same method for every phase', fix: "If every phase uses the double undercut, a sharp observer will spot the pattern. Each phase should use a different technique — variety disguises the method." },
      { _key: 'ac-m2', mistake: 'Not building escalation', fix: "If the first phase is as impossible as the last, the routine peaks too early. Start simple, escalate. The impossibility curve should always trend upward." },
    ],
    practiceDrill: { title: 'Full Routine Run', description: "Perform the complete Ambitious Card routine for a mirror, timing yourself. The whole routine should take 3–5 minutes. If it's shorter, you're rushing. If longer, you're stalling.", reps: 'Full run-throughs, 10 per week — vary your phases each session' },
    performanceContext: "The Ambitious Card is your centerpiece trick — the one you show when someone says 'do your best trick.' Learn it deeply, script it thoroughly, and perform it often. It should feel like a story with a beginning, middle, and an ending that takes their breath away.",
  },
]

// ─────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────

async function seed() {
  console.log(`\nConnecting to Sanity project: ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`Dataset: ${env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'}`)
  console.log(`Seeding ${LESSONS.length} lessons...\n`)

  // Delete existing lesson documents to avoid duplicates
  console.log('Deleting existing lessons...')
  const existing = await client.fetch(`*[_type == "lesson"]._id`)
  if (existing.length > 0) {
    const deleteTx = client.transaction()
    existing.forEach(id => deleteTx.delete(id))
    await deleteTx.commit()
    console.log(`  Deleted ${existing.length} existing lessons`)
  } else {
    console.log('  No existing lessons found')
  }

  // Create all lessons in batches of 10
  const BATCH_SIZE = 10
  let created = 0
  for (let i = 0; i < LESSONS.length; i += BATCH_SIZE) {
    const batch = LESSONS.slice(i, i + BATCH_SIZE)
    const tx = client.transaction()
    batch.forEach(lesson => tx.createOrReplace(lesson))
    await tx.commit()
    created += batch.length
    console.log(`  ✓ Created lessons ${i + 1}–${Math.min(i + BATCH_SIZE, LESSONS.length)} of ${LESSONS.length}`)
  }

  console.log(`\n✅ Seeding complete — ${created} lessons created`)
  console.log('\nBreakdown:')
  const cats = {}
  LESSONS.forEach(l => { cats[l.category] = (cats[l.category] || 0) + 1 })
  Object.entries(cats).forEach(([cat, count]) => console.log(`  ${cat}: ${count} lessons`))
}

seed().catch(err => {
  console.error('\n❌ Seed failed:', err.message)
  process.exit(1)
})
