import type { ReadingPassage, ListeningExercise, DailyPhrase, PronunciationItem } from '@/types'

// ─── READING PASSAGES (5) ─────────────────────────────────────────────────────
export const readingPassages: ReadingPassage[] = [
  {
    id: 'r01',
    title: 'My Daily Routine',
    level: 'N5',
    topic: 'Daily Life',
    estimatedTime: 5,
    bodyJp: '私は毎朝六時に起きます。朝ごはんはパンとコーヒーです。七時半に家を出て、電車で学校に行きます。学校は八時半に始まります。授業は四時に終わります。家に帰ってから、宿題をして、夕ごはんを食べます。夜十時ごろ寝ます。',
    bodyFurigana: 'わたしはまいあさろくじにおきます。あさごはんはパンとコーヒーです。しちじはんにいえをでて、でんしゃでがっこうにいきます。がっこうははちじはんにはじまります。じゅぎょうはよじにおわります。いえにかえってから、しゅくだいをして、ゆうごはんをたべます。よるじゅうじごろねます。',
    bodyEn: 'I wake up every morning at 6 o'clock. Breakfast is bread and coffee. I leave the house at 7:30 and go to school by train. School starts at 8:30. Classes end at 4 o'clock. After returning home, I do homework and eat dinner. I sleep around 10 PM.',
    questions: [
      { question: 'What time does the author wake up?', options: ['5:00', '6:00', '7:00', '7:30'], answer: 1 },
      { question: 'How does the author go to school?', options: ['By bus', 'On foot', 'By train', 'By bicycle'], answer: 2 },
      { question: 'What does the author do after returning home?', options: ['Watch TV', 'Do homework', 'Go to the gym', 'Sleep immediately'], answer: 1 },
    ],
  },
  {
    id: 'r02',
    title: 'A Visit to a Japanese Restaurant',
    level: 'N5',
    topic: 'Food',
    estimatedTime: 5,
    bodyJp: '昨日、友達と日本料理のレストランに行きました。私はラーメンを食べました。友達は寿司を食べました。ラーメンはとてもおいしかったです。お茶もおいしかったです。レストランはきれいで、店員さんも親切でした。また行きたいです。',
    bodyFurigana: 'きのう、ともだちとにほんりょうりのレストランにいきました。わたしはラーメンをたべました。ともだちはすしをたべました。ラーメンはとてもおいしかったです。おちゃもおいしかったです。レストランはきれいで、てんいんさんもしんせつでした。またいきたいです。',
    bodyEn: 'Yesterday I went to a Japanese restaurant with a friend. I ate ramen. My friend ate sushi. The ramen was very delicious. The tea was also delicious. The restaurant was clean and the staff were also kind. I want to go again.',
    questions: [
      { question: 'What did the author eat?', options: ['Sushi', 'Ramen', 'Tempura', 'Udon'], answer: 1 },
      { question: 'How was the restaurant?', options: ['Dirty', 'Expensive', 'Clean and staff were kind', 'Far away'], answer: 2 },
      { question: 'Does the author want to go back?', options: ['No', 'Yes', 'Maybe', 'Not mentioned'], answer: 1 },
    ],
  },
  {
    id: 'r03',
    title: 'Weather and Seasons in Japan',
    level: 'N5',
    topic: 'Weather',
    estimatedTime: 6,
    bodyJp: '日本には四つの季節があります。春は暖かくて、桜がきれいです。夏はとても暑いです。秋は涼しくて、紅葉がきれいです。冬は寒いです。東京では雪はあまり降りません。私は春が一番好きです。',
    bodyFurigana: 'にほんにはよっつのきせつがあります。はるはあたたかくて、さくらがきれいです。なつはとてもあついです。あきはすずしくて、こうようがきれいです。ふゆはさむいです。とうきょうではゆきはあまりふりません。わたしははるがいちばんすきです。',
    bodyEn: 'Japan has four seasons. Spring is warm and the cherry blossoms are beautiful. Summer is very hot. Autumn is cool and the autumn leaves are beautiful. Winter is cold. In Tokyo it does not snow very much. I like spring the best.',
    questions: [
      { question: 'How many seasons does Japan have?', options: ['Two', 'Three', 'Four', 'Five'], answer: 2 },
      { question: 'What is summer like in Japan?', options: ['Cool', 'Cold', 'Very hot', 'Warm'], answer: 2 },
      { question: 'Which season does the author like best?', options: ['Summer', 'Winter', 'Autumn', 'Spring'], answer: 3 },
    ],
  },
  {
    id: 'r04',
    title: 'Planning a Trip to Kyoto',
    level: 'N4',
    topic: 'Travel',
    estimatedTime: 8,
    bodyJp: '来月、友達と京都へ旅行する予定です。京都には有名なお寺や神社がたくさんあります。新幹線で東京から約二時間十五分かかります。ホテルはもう予約しました。三日間の旅行です。一日目は金閣寺へ行きます。二日目は嵐山を散歩します。三日目は京都の市場で買い物をする予定です。楽しみにしています。',
    bodyFurigana: 'らいげつ、ともだちときょうとへりょこうするよていです。きょうとにはゆうめいなおてらやじんじゃがたくさんあります。しんかんせんでとうきょうからやくにじかんじゅうごふんかかります。ホテルはもうよやくしました。みっかかんのりょこうです。いちにちめはきんかくじへいきます。ふつかめはあらしやまをさんぽします。みっかめはきょうとのいちばでかいものをするよていです。たのしみにしています。',
    bodyEn: 'Next month I plan to travel to Kyoto with a friend. Kyoto has many famous temples and shrines. It takes about 2 hours and 15 minutes from Tokyo by bullet train. I have already booked the hotel. It is a three-day trip. On the first day we will go to Kinkakuji. On the second day we will walk around Arashiyama. On the third day we plan to shop at Kyoto's market. I am looking forward to it.',
    questions: [
      { question: 'How long does it take to get to Kyoto from Tokyo by Shinkansen?', options: ['About 1 hour', 'About 2 hours 15 minutes', 'About 3 hours', 'About 4 hours'], answer: 1 },
      { question: 'What will they do on the second day?', options: ['Visit Kinkakuji', 'Shop at a market', 'Walk around Arashiyama', 'Return to Tokyo'], answer: 2 },
      { question: 'Has the author already booked a hotel?', options: ['No, not yet', 'Yes, already booked', 'They will stay at a friend's house', 'Not mentioned'], answer: 1 },
    ],
  },
  {
    id: 'r05',
    title: 'Japanese Work Culture',
    level: 'N4',
    topic: 'Work',
    estimatedTime: 9,
    bodyJp: '日本の会社では、時間を守ることがとても大切です。朝、定時より少し早く来る社員が多いです。残業も多く、仕事が終わっても上司が帰るまで待つ人もいます。しかし、最近は働き方が変わってきています。テレワークを導入する会社が増えており、仕事と生活のバランスを大切にする考え方が広まっています。',
    bodyFurigana: 'にほんのかいしゃでは、じかんをまもることがとてもたいせつです。あさ、ていじよりすこしはやくくるしゃいんがおおいです。ざんぎょうもおおく、しごとがおわってもじょうしがかえるまでまつひともいます。しかし、さいきんははたらきかたがかわってきています。テレワークをどうにゅうするかいしゃがふえており、しごととせいかつのバランスをたいせつにするかんがえかたがひろまっています。',
    bodyEn: 'In Japanese companies, being punctual is very important. Many employees come to work a little earlier than the official start time in the morning. Overtime is also common, and some people wait until their boss leaves even after their own work is finished. However, recently working styles have been changing. Companies introducing remote work are increasing, and a way of thinking that values work-life balance is spreading.',
    questions: [
      { question: 'What is very important in Japanese companies according to the text?', options: ['Wearing a uniform', 'Being punctual', 'Working alone', 'Speaking English'], answer: 1 },
      { question: 'What recent change is happening in Japanese work culture?', options: ['More overtime', 'Introduction of remote work', 'Stricter rules', 'Longer working hours'], answer: 1 },
      { question: 'Why do some employees wait after finishing work?', options: ['They enjoy overtime', 'They wait for the bus', 'They wait until their boss leaves', 'They have more work to do'], answer: 2 },
    ],
  },
]

// ─── LISTENING EXERCISES (5) ──────────────────────────────────────────────────
export const listeningExercises: ListeningExercise[] = [
  {
    id: 'l01', title: 'At the Train Station', level: 'N5', topic: 'Travel',
    audioSrc: '/audio/l01.mp3',
    transcript: 'A: すみません、東京駅はどこですか？
B: ああ、あそこの信号を左に曲がると、右側にありますよ。
A: ありがとうございます。歩いて何分くらいかかりますか？
B: だいたい五分くらいです。
A: そうですか。ありがとうございました。
B: いいえ、どういたしまして。',
    questions: [
      { question: 'What is the person looking for?', options: ['A convenience store', 'Tokyo Station', 'A restaurant', 'A hospital'], answer: 1 },
      { question: 'How long does it take to walk there?', options: ['About 2 minutes', 'About 5 minutes', 'About 10 minutes', 'About 15 minutes'], answer: 1 },
      { question: 'Which direction should you turn at the traffic light?', options: ['Right', 'Left', 'Straight', 'U-turn'], answer: 1 },
    ],
  },
  {
    id: 'l02', title: 'Ordering Food at a Restaurant', level: 'N5', topic: 'Food',
    audioSrc: '/audio/l02.mp3',
    transcript: 'ウェイター：いらっしゃいませ。ご注文はお決まりですか？
お客さん：えーと、ラーメンと餃子をひとつずつください。
ウェイター：お飲み物はいかがですか？
お客さん：お茶をお願いします。
ウェイター：かしこまりました。少々お待ちください。',
    questions: [
      { question: 'What did the customer order to eat?', options: ['Sushi and tempura', 'Ramen and gyoza', 'Udon and rice', 'Curry and salad'], answer: 1 },
      { question: 'What drink did the customer order?', options: ['Water', 'Coffee', 'Tea', 'Juice'], answer: 2 },
      { question: 'How many ramen did the customer order?', options: ['One', 'Two', 'Three', 'Not mentioned'], answer: 0 },
    ],
  },
  {
    id: 'l03', title: 'A Phone Conversation', level: 'N5', topic: 'Daily Life',
    audioSrc: '/audio/l03.mp3',
    transcript: 'A：もしもし、田中です。
B：あ、田中さん！明日の会議、何時からでしたっけ？
A：午後二時からです。場所は三階の会議室ですよ。
B：あ、そうですか。ありがとうございます。
A：はい、では明日よろしくお願いします。
B：はい、失礼します。',
    questions: [
      { question: 'What time is the meeting tomorrow?', options: ['10 AM', '1 PM', '2 PM', '3 PM'], answer: 2 },
      { question: 'Where is the meeting room?', options: ['1st floor', '2nd floor', '3rd floor', '4th floor'], answer: 2 },
      { question: 'Who called whom?', options: ['Tanaka called B', 'B called Tanaka', 'They met in person', 'Not clear'], answer: 1 },
    ],
  },
  {
    id: 'l04', title: 'Talking About Hobbies', level: 'N4', topic: 'Hobbies',
    audioSrc: '/audio/l04.mp3',
    transcript: 'A：田中さんは趣味は何ですか？
B：私は写真を撮るのが好きです。週末はよくカメラを持って公園に行きます。
A：いいですね。私は料理が好きです。最近、日本料理を作ることを練習しています。
B：それはすごいですね。いつか作ってもらえますか？
A：もちろん！今度一緒に食べましょう。',
    questions: [
      { question: 'What is Tanaka's hobby?', options: ['Cooking', 'Photography', 'Reading', 'Sports'], answer: 1 },
      { question: 'Where does Tanaka often go on weekends?', options: ['The museum', 'The park', 'The library', 'The gym'], answer: 1 },
      { question: 'What is the other person recently practicing?', options: ['Taking photos', 'Making Italian food', 'Making Japanese food', 'Playing guitar'], answer: 2 },
    ],
  },
  {
    id: 'l05', title: 'Making Plans', level: 'N4', topic: 'Daily Life',
    audioSrc: '/audio/l05.mp3',
    transcript: 'A：来週の土曜日、何か予定はありますか？
B：特にないです。どうしましたか？
A：映画を見に行きませんか？新しいアクション映画がやっているんですが。
B：いいですね！何時ごろがいいですか？
A：午後三時の回はどうですか？
B：大丈夫です。どこの映画館ですか？
A：渋谷の映画館です。駅から歩いて五分くらいです。
B：わかりました。じゃあ、映画館の前で待ち合わせましょう。',
    questions: [
      { question: 'When are they planning to go out?', options: ['This weekend', 'Next Saturday', 'Next Sunday', 'Next Friday'], answer: 1 },
      { question: 'What type of movie will they watch?', options: ['Romance', 'Horror', 'Comedy', 'Action'], answer: 3 },
      { question: 'Where will they meet?', options: ['At the station', 'In front of the cinema', 'At a restaurant', 'At school'], answer: 1 },
    ],
  },
]

// ─── DAILY PHRASES (10) ───────────────────────────────────────────────────────
export const dailyPhrases: DailyPhrase[] = [
  { id:'dp01', japanese:'おはようございます', furigana:'おはようございます', romaji:'ohayou gozaimasu', english:'Good morning (polite)', context:'Used when greeting someone in the morning, at work or school.' },
  { id:'dp02', japanese:'おやすみなさい', furigana:'おやすみなさい', romaji:'oyasumi nasai', english:'Good night', context:'Used when going to sleep or saying goodbye at night.' },
  { id:'dp03', japanese:'いただきます', furigana:'いただきます', romaji:'itadakimasu', english:'Let's eat (before a meal)', context:'Said before eating as a gesture of gratitude for the food.' },
  { id:'dp04', japanese:'ごちそうさまでした', furigana:'ごちそうさまでした', romaji:'gochisou sama deshita', english:'Thank you for the meal (after eating)', context:'Said after finishing a meal to express thanks.' },
  { id:'dp05', japanese:'はじめまして', furigana:'はじめまして', romaji:'hajimemashite', english:'Nice to meet you (first meeting)', context:'Used only when meeting someone for the first time.' },
  { id:'dp06', japanese:'よろしくおねがいします', furigana:'よろしくおねがいします', romaji:'yoroshiku onegai shimasu', english:'Please treat me well / Nice to meet you', context:'Used after introducing yourself, or when asking someone for a favor.' },
  { id:'dp07', japanese:'ただいま', furigana:'ただいま', romaji:'tadaima', english:'I'm home!', context:'Said when returning home. The expected response is おかえりなさい.' },
  { id:'dp08', japanese:'おかえりなさい', furigana:'おかえりなさい', romaji:'okaeri nasai', english:'Welcome back!', context:'Said in response to ただいま when someone returns home.' },
  { id:'dp09', japanese:'きをつけて', furigana:'きをつけて', romaji:'ki wo tsukete', english:'Take care / Be careful', context:'Said when someone is leaving or going somewhere, as a farewell.' },
  { id:'dp10', japanese:'どういたしまして', furigana:'どういたしまして', romaji:'dou itashimashite', english:'You're welcome', context:'The formal response to ありがとう (thank you).' },
]

// ─── PRONUNCIATION ITEMS (10) ────────────────────────────────────────────────
export const pronunciationItems: PronunciationItem[] = [
  { id:'p01', title:'The Five Japanese Vowels', description:'Japanese has only five vowel sounds: a, i, u, e, o. Unlike English, they are always pronounced clearly and consistently.', examples:[{jp:'あ',romaji:'a (like "ah")',note:'Open mouth sound'},{jp:'い',romaji:'i (like "ee")',note:'High front vowel'},{jp:'う',romaji:'u (like "oo" but unrounded)',note:'Back vowel'},{jp:'え',romaji:'e (like "eh")',note:'Mid vowel'},{jp:'お',romaji:'o (like "oh")',note:'Round vowel'}]},
  { id:'p02', title:'Long Vowels', description:'Japanese distinguishes between short and long vowels. A long vowel is held for twice the duration. In hiragana, long vowels are written with an extra vowel character.', examples:[{jp:'おかあさん',romaji:'okaasan (mother)',note:'The "aa" is held longer'},{jp:'おとうさん',romaji:'otousan (father)',note:'The "ou" is elongated'},{jp:'えき vs. えーき',romaji:'eki vs. eeki',note:'eki = station; eeki = wrong word — length matters!'}]},
  { id:'p03', title:'Double Consonants (っ / ッ)', description:'The small っ (tsu) represents a brief pause before the following consonant. It adds emphasis and changes the word's meaning.', examples:[{jp:'きって',romaji:'kitte (stamp)',note:'vs きて kite (come) — completely different!'},{jp:'いった',romaji:'itta (went)',note:'vs いた ita (was) — length changes meaning'},{jp:'ざっし',romaji:'zasshi (magazine)',note:'Pause before sh sound'}]},
  { id:'p04', title:'Pitch Accent Basics', description:'Japanese uses pitch accent (high-low tone patterns) rather than stress accent. The pitch pattern can change a word's meaning.', examples:[{jp:'はし (HIGH-low)',romaji:'hashi = chopsticks',note:'High pitch on ha'},{jp:'はし (low-HIGH)',romaji:'hashi = bridge',note:'High pitch on shi'},{jp:'あめ',romaji:'ame = rain vs ame = candy',note:'Different pitch patterns'}]},
  { id:'p05', title:'The R Sound (ら り る れ ろ)', description:'The Japanese "r" is not like English "r" or "l." It is a quick tap of the tongue on the ridge behind the upper front teeth.', examples:[{jp:'ら',romaji:'ra — tongue tap',note:'Not "la" or "ra" in English'},{jp:'りんご',romaji:'ringo (apple)',note:'Soft r at beginning'},{jp:'トイレ',romaji:'toire (toilet)',note:'The r is a quick tap'}]},
  { id:'p06', title:'The N Sound (ん / ン)', description:'ん is a syllabic nasal — it forms a full mora on its own. Its exact sound depends on what comes after it.', examples:[{jp:'にほん',romaji:'nihon (Japan)',note:'Final n holds its own beat'},{jp:'さんぽ',romaji:'sanpo (stroll)',note:'n before p sounds like m'},{jp:'えんぴつ',romaji:'enpitsu (pencil)',note:'n changes based on next sound'}]},
  { id:'p07', title:'Voiced vs. Unvoiced Consonants', description:'Adding dakuten (″) to certain consonants voices them: k→g, s→z, t→d, h→b. Adding handakuten (°) to h makes p.', examples:[{jp:'か→が',romaji:'ka → ga',note:'k becomes g'},{jp:'さ→ざ',romaji:'sa → za',note:'s becomes z'},{jp:'は→ば→ぱ',romaji:'ha → ba → pa',note:'h becomes b or p'}]},
  { id:'p08', title:'Syllable Timing (Mora)', description:'Japanese is mora-timed — every mora (basic sound unit) takes roughly the same amount of time to say.', examples:[{jp:'にほんご',romaji:'ni-ho-n-go = 4 moras',note:'Each unit has equal time'},{jp:'とうきょう',romaji:'to-u-kyo-u = 4 moras',note:'Long vowels count double'},{jp:'きって',romaji:'ki-t-te = 3 moras',note:'っ counts as its own mora'}]},
  { id:'p09', title:'Silent Vowels (i and u)', description:'The vowels い and う are often devoiced (nearly silent) when they appear between or after voiceless consonants.', examples:[{jp:'です',romaji:'desu → "des" (u is silent)',note:'Very common in natural speech'},{jp:'します',romaji:'shimasu → "shimas"',note:'Final u often silent'},{jp:'すき',romaji:'suki → "ski"',note:'u is devoiced after s'}]},
  { id:'p10', title:'Shadowing Practice Tips', description:'Shadowing means repeating what you hear immediately as you listen. It is one of the best ways to improve pronunciation and natural rhythm.', examples:[{jp:'ゆっくり → 普通',romaji:'Slow → Normal speed',note:'Start slow, then match natural pace'},{jp:'リピートする',romaji:'Repeat what you hear',note:'Don't translate — just shadow'},{jp:'録音して聞く',romaji:'Record and listen back',note:'Self-monitoring improves accuracy fast'}]},
]

export { readingPassages, listeningExercises, dailyPhrases, pronunciationItems }
