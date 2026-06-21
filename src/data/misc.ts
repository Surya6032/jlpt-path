import type { ReadingPassage, ListeningExercise, DailyPhrase, PronunciationItem } from '@/types'

// --- READING PASSAGES (24) --------------------------------------------------
export const readingPassages: ReadingPassage[] = [
  {
    id: 'r01',
    title: 'My Daily Routine',
    level: 'N5',
    topic: 'Daily Life',
    estimatedTime: 5,
    bodyJp: '私は毎朝六時に起きます。朝ごはんはパンとコーヒーです。七時半に家を出て、電車で学校に行きます。学校は八時半に始まります。授業は四時に終わります。家に帰ってから、宿題をして、夕ごはんを食べます。夜十時ごろ寝ます。',
    bodyFurigana: 'わたしはまいあさろくじにおきます。あさごはんはパンとコーヒーです。しちじはんにいえをでて、でんしゃでがっこうにいきます。がっこうははちじはんにはじまります。じゅぎょうはよじにおわります。いえにかえってから、しゅくだいをして、ゆうごはんをたべます。よるじゅうじごろねます。',
    bodyEn: `I wake up every morning at 6 o'clock. Breakfast is bread and coffee. I leave the house at 7:30 and go to school by train. School starts at 8:30. Classes end at 4 o'clock. After returning home, I do homework and eat dinner. I sleep around 10 PM.`,
    questions: [
      { question: `What time does the author wake up?`, options: [`5:00`, `6:00`, `7:00`, `7:30`], answer: 1 },
      { question: `How does the author go to school?`, options: [`By bus`, `On foot`, `By train`, `By bicycle`], answer: 2 },
      { question: `What does the author do after returning home?`, options: [`Watch TV`, `Do homework`, `Go to the gym`, `Sleep immediately`], answer: 1 },
    ],
  },
  {
    id: 'r02',
    title: 'My Family',
    level: 'N5',
    topic: 'Family',
    estimatedTime: 5,
    bodyJp: '私の家族は四人です。父と母と妹と私です。父は会社員で、毎日電車で会社に行きます。母は料理が上手です。妹は小学生です。週末は家族みんなで公園に行くことが多いです。',
    bodyFurigana: 'わたしのかぞくはよにんです。ちちとははとうとわたしです。ちちはかいしゃいんで、まいにちでんしゃでかいしゃにいきます。はははりょうりがじょうずです。いもうとはしょうがくせいです。しゅうまつはかぞくみんなでこうえんにいくことがおおいです。',
    bodyEn: `My family has four people. It is my father, mother, younger sister, and me. My father is a company employee and goes to work by train every day. My mother is good at cooking. My sister is an elementary school student. On weekends, we often go to the park together as a family.`,
    questions: [
      { question: `How many people are in the family?`, options: [`3`, `4`, `5`, `6`], answer: 1 },
      { question: `How does the father go to work?`, options: [`By car`, `By bus`, `By train`, `On foot`], answer: 2 },
      { question: `What is the mother good at?`, options: [`Singing`, `Cooking`, `Sports`, `Drawing`], answer: 1 },
    ],
  },
  {
    id: 'r03',
    title: 'At the Convenience Store',
    level: 'N5',
    topic: 'Shopping',
    estimatedTime: 5,
    bodyJp: 'コンビニはとても便利です。食べ物や飲み物だけでなく、雑誌や文房具も売っています。ATMもあります。私は毎日コンビニでおにぎりとお茶を買います。夜も開いているので、助かります。',
    bodyFurigana: 'コンビニはとてもべんりです。たべものやのみものだけでなく、ざっしやぶんぼうぐもうっています。ATMもあります。わたしはまいにちコンビニでおにぎりとおちゃをかいます。よるもあいているので、たすかります。',
    bodyEn: `Convenience stores are very useful. They sell not only food and drinks but also magazines and stationery. There are also ATMs. I buy onigiri and tea at the convenience store every day. It is helpful because they are open at night too.`,
    questions: [
      { question: `What does the author buy every day?`, options: [`Bread and coffee`, `Onigiri and tea`, `Magazines and pens`, `Juice and snacks`], answer: 1 },
      { question: `What service is available at the convenience store?`, options: [`Post office`, `ATM`, `Library`, `Hospital`], answer: 1 },
      { question: `Why does the author find convenience stores helpful?`, options: [`They are cheap`, `They are near school`, `They are open at night`, `They have good staff`], answer: 2 },
    ],
  },
  {
    id: 'r04',
    title: 'My Hobby',
    level: 'N5',
    topic: 'Hobbies',
    estimatedTime: 5,
    bodyJp: '私の趣味は写真を撮ることです。休みの日に公園や町に行って、きれいな景色や面白いものを撮ります。先月、友達と山に行って、たくさん写真を撮りました。写真はスマホで撮ります。',
    bodyFurigana: 'わたしのしゅみはしゃしんをとることです。やすみのひにこうえんやまちにいって、きれいなけしきやおもしろいものをとります。せんげつ、ともだちとやまにいって、たくさんしゃしんをとりました。しゃしんはスマホでとります。',
    bodyEn: `My hobby is taking photos. On days off I go to parks and towns and take pictures of beautiful scenery and interesting things. Last month I went to the mountains with a friend and took many photos. I take photos with my smartphone.`,
    questions: [
      { question: `What is the author's hobby?`, options: [`Painting`, `Taking photos`, `Hiking`, `Cooking`], answer: 1 },
      { question: `What does the author use to take photos?`, options: [`Film camera`, `Digital camera`, `Smartphone`, `Tablet`], answer: 2 },
      { question: `Where did the author go last month?`, options: [`The beach`, `The city`, `The mountains`, `A museum`], answer: 2 },
    ],
  },
  {
    id: 'r05',
    title: 'A Letter to a Pen Pal',
    level: 'N5',
    topic: 'Communication',
    estimatedTime: 5,
    bodyJp: 'こんにちは。私はさくらです。日本の東京に住んでいます。趣味は音楽を聴くことと、本を読むことです。好きな食べ物はすしとラーメンです。あなたの国の料理を教えてください。よろしくお願いします。',
    bodyFurigana: 'こんにちは。わたしはさくらです。にほんのとうきょうにすんでいます。しゅみはおんがくをきくことと、ほんをよむことです。すきなたべものはすしとラーメンです。あなたのくにのりょうりをおしえてください。よろしくおねがいします。',
    bodyEn: `Hello. I am Sakura. I live in Tokyo, Japan. My hobbies are listening to music and reading books. My favorite foods are sushi and ramen. Please tell me about your country's food. Nice to meet you.`,
    questions: [
      { question: `Where does Sakura live?`, options: [`Osaka`, `Kyoto`, `Tokyo`, `Sapporo`], answer: 2 },
      { question: `What is one of Sakura's hobbies?`, options: [`Playing sports`, `Listening to music`, `Watching movies`, `Cooking`], answer: 1 },
      { question: `What does Sakura ask the pen pal about?`, options: [`Their job`, `Their city`, `Their family`, `Their country's food`], answer: 3 },
    ],
  },
  {
    id: 'r06',
    title: 'A School Day',
    level: 'N5',
    topic: 'School',
    estimatedTime: 5,
    bodyJp: '今日は月曜日です。一時間目は数学で、二時間目は英語です。昼ごはんは学校で食べます。午後は体育と美術があります。放課後、図書館で宿題をします。五時に家に帰ります。',
    bodyFurigana: 'きょうはげつようびです。いちじかんめはすうがくで、にじかんめはえいごです。ひるごはんはがっこうでたべます。ごごはたいいくとびじゅつがあります。ほうかご、としょかんでしゅくだいをします。ごじにいえにかえります。',
    bodyEn: `Today is Monday. The first period is math and the second is English. I eat lunch at school. In the afternoon there is PE and art. After school I do homework in the library. I go home at 5 o'clock.`,
    questions: [
      { question: `What is the first period?`, options: [`English`, `Art`, `Math`, `PE`], answer: 2 },
      { question: `Where does the author do homework?`, options: [`At home`, `In the classroom`, `In the library`, `At a cafe`], answer: 2 },
      { question: `What time does the author go home?`, options: [`4:00`, `5:00`, `6:00`, `3:30`], answer: 1 },
    ],
  },
  {
    id: 'r07',
    title: 'My Pet',
    level: 'N5',
    topic: 'Animals',
    estimatedTime: 5,
    bodyJp: '私は犬を飼っています。名前はポチです。ポチはボールが大好きです。毎朝、公園で散歩します。ポチは私のベッドの近くで寝ます。ポチは家族みんなに人気があります。',
    bodyFurigana: 'わたしはいぬをかっています。なまえはポチです。ポチはボールがだいすきです。まいあさ、こうえんでさんぽします。ポチはわたしのベッドのちかくでねます。ポチはかぞくみんなににんきがあります。',
    bodyEn: `I have a dog. Its name is Pochi. Pochi loves balls. Every morning we walk in the park. Pochi sleeps near my bed. Pochi is popular with everyone in my family.`,
    questions: [
      { question: `What kind of pet does the author have?`, options: [`Cat`, `Dog`, `Rabbit`, `Bird`], answer: 1 },
      { question: `What does Pochi love?`, options: [`Cats`, `Balls`, `Water`, `Running`], answer: 1 },
      { question: `Where does Pochi sleep?`, options: [`In the garden`, `In the kitchen`, `Near the author's bed`, `On the sofa`], answer: 2 },
    ],
  },
  {
    id: 'r08',
    title: 'A Rainy Day',
    level: 'N5',
    topic: 'Weather',
    estimatedTime: 5,
    bodyJp: '今日は雨です。外に出たくないので、家で本を読みます。お母さんがホットチョコレートを作ってくれました。窓から雨を見ながら、静かに過ごしました。雨の日も好きです。',
    bodyFurigana: 'きょうはあめです。そとにでたくないので、いえでほんをよみます。おかあさんがホットチョコレートをつくってくれました。まどからあめをみながら、しずかにすごしました。あめのひもすきです。',
    bodyEn: `Today it is raining. Because I do not want to go outside, I read a book at home. My mother made hot chocolate for me. I spent a quiet time watching the rain from the window. I like rainy days too.`,
    questions: [
      { question: `What does the author do on this rainy day?`, options: [`Watch TV`, `Go shopping`, `Read a book`, `Sleep`], answer: 2 },
      { question: `Who made hot chocolate?`, options: [`The author`, `The father`, `The mother`, `A friend`], answer: 2 },
      { question: `Where does the author watch the rain from?`, options: [`The garden`, `The roof`, `The window`, `The door`], answer: 2 },
    ],
  },
  {
    id: 'r09',
    title: 'At the Doctor',
    level: 'N5',
    topic: 'Health',
    estimatedTime: 5,
    bodyJp: '昨日、病院に行きました。頭が痛くて、熱もありました。医者は「三日間、薬を飲んでください」と言いました。今日は学校を休みました。早く元気になりたいです。',
    bodyFurigana: 'きのう、びょういんにいきました。あたまがいたくて、ねつもありました。いしゃは「みっかかん、くすりをのんでください」といいました。きょうはがっこうをやすみました。はやくげんきになりたいです。',
    bodyEn: `Yesterday I went to the hospital. I had a headache and a fever. The doctor said please take medicine for three days. I was absent from school today. I want to get better soon.`,
    questions: [
      { question: `Why did the author go to the hospital?`, options: [`Broken arm`, `Headache and fever`, `Stomachache`, `Eye problem`], answer: 1 },
      { question: `For how many days should the author take medicine?`, options: [`1`, `2`, `3`, `5`], answer: 2 },
      { question: `What did the author do today?`, options: [`Went to school`, `Went to work`, `Stayed home from school`, `Went shopping`], answer: 2 },
    ],
  },
  {
    id: 'r10',
    title: 'Weekend Plans',
    level: 'N5',
    topic: 'Plans',
    estimatedTime: 5,
    bodyJp: '今週末は友達と映画を見に行く予定です。映画の後、レストランで夕ごはんを食べます。日曜日は家で勉強します。来週テストがあるので、頑張らなければなりません。',
    bodyFurigana: 'こんしゅうまつはともだちとえいがをみにいくよていです。えいがのあと、レストランでゆうごはんをたべます。にちようびはいえでべんきょうします。らいしゅうテストがあるので、がんばらなければなりません。',
    bodyEn: `This weekend I plan to go see a movie with a friend. After the movie we will eat dinner at a restaurant. On Sunday I will study at home. I have a test next week so I must do my best.`,
    questions: [
      { question: `What does the author plan to do this weekend?`, options: [`Go hiking`, `See a movie`, `Play tennis`, `Visit family`], answer: 1 },
      { question: `What will happen next week?`, options: [`A trip`, `A concert`, `A test`, `A party`], answer: 2 },
      { question: `What will the author do on Sunday?`, options: [`See friends`, `Go shopping`, `Study at home`, `Watch TV`], answer: 2 },
    ],
  },
  {
    id: 'r11',
    title: 'My Neighborhood',
    level: 'N5',
    topic: 'Local Area',
    estimatedTime: 5,
    bodyJp: '私の町には公園とスーパーとコンビニがあります。駅まで歩いて十分かかります。近くに図書館もあります。静かで住みやすい町です。',
    bodyFurigana: 'わたしのまちにはこうえんとスーパーとコンビニがあります。えきまであるいてじゅっぷんかかります。ちかくにとしょかんもあります。しずかですみやすいまちです。',
    bodyEn: `My town has a park, a supermarket, and a convenience store. It takes ten minutes to walk to the station. There is also a library nearby. It is a quiet and easy place to live.`,
    questions: [
      { question: `How long does it take to walk to the station?`, options: [`5 minutes`, `10 minutes`, `15 minutes`, `20 minutes`], answer: 1 },
      { question: `What facility is near the author's home?`, options: [`Hospital`, `School`, `Library`, `Hotel`], answer: 2 },
      { question: `How does the author describe the town?`, options: [`Noisy and fun`, `Quiet and easy to live in`, `Far from everything`, `Very crowded`], answer: 1 },
    ],
  },
  {
    id: 'r12',
    title: 'Seasons in Japan',
    level: 'N5',
    topic: 'Nature',
    estimatedTime: 5,
    bodyJp: '日本には四つの季節があります。春は桜がきれいです。夏はとても暑いです。秋は葉っぱが赤や黄色になります。冬は雪が降る地域もあります。私は秋が一番好きです。',
    bodyFurigana: 'にほんにはよっつのきせつがあります。はるはさくらがきれいです。なつはとてもあついです。あきははっぱがあかやきいろになります。ふゆはゆきがふるちいきもあります。わたしはあきがいちばんすきです。',
    bodyEn: `Japan has four seasons. In spring the cherry blossoms are beautiful. Summer is very hot. In autumn the leaves turn red and yellow. In winter some areas get snow. I like autumn the best.`,
    questions: [
      { question: `What is Japan known for in spring?`, options: [`Snow`, `Cherry blossoms`, `Typhoons`, `Harvest festivals`], answer: 1 },
      { question: `What color do the leaves turn in autumn?`, options: [`Green and blue`, `White and pink`, `Red and yellow`, `Orange and purple`], answer: 2 },
      { question: `Which season does the author like best?`, options: [`Spring`, `Summer`, `Autumn`, `Winter`], answer: 2 },
    ],
  },
  {
    id: 'r13',
    title: 'Moving to a New City',
    level: 'N4',
    topic: 'Daily Life',
    estimatedTime: 7,
    bodyJp: '先月、東京から大阪に引っ越しました。新しいアパートは駅から近くて便利ですが、まだ近所のことがよくわかりません。先週、近くのスーパーで買い物をしたとき、店員さんが親切に教えてくれました。少しずつ慣れていきたいと思います。',
    bodyFurigana: 'せんげつ、とうきょうからおおさかにひっこしました。あたらしいアパートはえきからちかくてべんりですが、まだきんじょのことがよくわかりません。せんしゅう、ちかくのスーパーでかいものをしたとき、てんいんさんがしんせつにおしえてくれました。すこしずつなれていきたいとおもいます。',
    bodyEn: `Last month I moved from Tokyo to Osaka. My new apartment is close to the station and convenient, but I still do not know the neighborhood well. Last week when I was shopping at a nearby supermarket, a staff member kindly helped me. I want to gradually get used to it.`,
    questions: [
      { question: `Where did the author move from?`, options: [`Kyoto`, `Tokyo`, `Nagoya`, `Fukuoka`], answer: 1 },
      { question: `What is good about the new apartment?`, options: [`It is large`, `It is cheap`, `It is close to the station`, `It has a garden`], answer: 2 },
      { question: `Who helped the author at the supermarket?`, options: [`A neighbor`, `A friend`, `A staff member`, `A family member`], answer: 2 },
    ],
  },
  {
    id: 'r14',
    title: 'Learning Japanese',
    level: 'N4',
    topic: 'Study',
    estimatedTime: 7,
    bodyJp: '日本語を勉強し始めて二年になります。最初はひらがなとカタカナを覚えるのが大変でした。今は漢字も少し読めるようになりました。毎日アプリで単語を練習して、週に二回、日本語教室に通っています。来年、JLPT N3を受けるつもりです。',
    bodyFurigana: 'にほんごをべんきょうしはじめてにねんになります。さいしょはひらがなとカタカナをおぼえるのがたいへんでした。いまはかんじもすこしよめるようになりました。まいにちアプリでたんごをれんしゅうして、しゅうににかい、にほんごきょうしつにかよっています。らいねん、JLPT N3をうけるつもりです。',
    bodyEn: `It has been two years since I started studying Japanese. At first it was hard to memorize hiragana and katakana. Now I can read a little kanji too. I practice vocabulary with an app every day and attend a Japanese class twice a week. I plan to take the JLPT N3 next year.`,
    questions: [
      { question: `How long has the author been studying Japanese?`, options: [`1 year`, `2 years`, `3 years`, `6 months`], answer: 1 },
      { question: `How often does the author attend Japanese class?`, options: [`Once a week`, `Every day`, `Twice a week`, `Once a month`], answer: 2 },
      { question: `What exam does the author plan to take next year?`, options: [`N5`, `N4`, `N3`, `N2`], answer: 2 },
    ],
  },
  {
    id: 'r15',
    title: 'Mountain Hiking',
    level: 'N4',
    topic: 'Nature',
    estimatedTime: 7,
    bodyJp: '先週末、友人と富士山に登りました。出発は朝五時で、頂上に着いたのは昼ごろでした。道は急で体力が必要でしたが、頂上からの景色は素晴らしかったです。帰りはバスを使いました。また来年も挑戦したいです。',
    bodyFurigana: 'せんしゅうまつ、ゆうじんとふじさんにのぼりました。しゅっぱつはあさごじで、ちょうじょうについたのはひるごろでした。みちはきゅうでたいりょくがひつようでしたが、ちょうじょうからのけしきはすばらしかったです。かえりはバスをつかいました。またらいねんもちょうせんしたいです。',
    bodyEn: `Last weekend I climbed Mt. Fuji with a friend. We departed at 5 AM and reached the summit around noon. The path was steep and required stamina, but the view from the top was magnificent. We took a bus on the way back. I want to challenge it again next year.`,
    questions: [
      { question: `What time did they depart?`, options: [`3 AM`, `5 AM`, `7 AM`, `9 AM`], answer: 1 },
      { question: `How was the path described?`, options: [`Flat and easy`, `Wet and muddy`, `Steep and demanding`, `Narrow and dark`], answer: 2 },
      { question: `How did they return?`, options: [`By train`, `On foot`, `By car`, `By bus`], answer: 3 },
    ],
  },
  {
    id: 'r16',
    title: 'Job Hunting',
    level: 'N4',
    topic: 'Work',
    estimatedTime: 7,
    bodyJp: '今年の春から就職活動を始めました。毎日、会社のウェブサイトを調べて、エントリーシートを書いています。先週は初めて面接を受けました。緊張しましたが、自分の言葉でしっかり話せたと思います。良い結果を待っています。',
    bodyFurigana: 'ことしのはるからしゅうしょくかつどうをはじめました。まいにち、かいしゃのウェブサイトをしらべて、エントリーシートをかいています。せんしゅうははじめてめんせつをうけました。きんちょうしましたが、じぶんのことばでしっかりはなせたとおもいます。よいけっかをまっています。',
    bodyEn: `I started job hunting this spring. Every day I research company websites and write entry sheets. Last week I had my first interview. I was nervous, but I think I spoke clearly in my own words. I am waiting for good results.`,
    questions: [
      { question: `When did the author start job hunting?`, options: [`Last year`, `This spring`, `Last month`, `This winter`], answer: 1 },
      { question: `What did the author do last week?`, options: [`Wrote a resume`, `Had an interview`, `Got a job offer`, `Quit a job`], answer: 1 },
      { question: `How did the author feel during the interview?`, options: [`Confident`, `Nervous`, `Bored`, `Angry`], answer: 1 },
    ],
  },
  {
    id: 'r17',
    title: 'Summer Festival',
    level: 'N4',
    topic: 'Culture',
    estimatedTime: 7,
    bodyJp: '先週末、地元の夏祭りに行きました。浴衣を着て、友達と花火を見ました。屋台でたこ焼きとかき氷を食べました。お祭りの雰囲気はとても楽しかったです。来年もまた行きたいと思います。',
    bodyFurigana: 'せんしゅうまつ、じもとのなつまつりにいきました。ゆかたをきて、ともだちとはなびをみました。やたいでたこやきとかきごおりをたべました。おまつりのふんいきはとてもたのしかったです。らいねんもまたいきたいとおもいます。',
    bodyEn: `Last weekend I went to the local summer festival. I wore a yukata and watched fireworks with friends. I ate takoyaki and shaved ice from the food stalls. The atmosphere of the festival was very fun. I want to go again next year.`,
    questions: [
      { question: `What did the author wear to the festival?`, options: [`Kimono`, `Yukata`, `Western clothes`, `School uniform`], answer: 1 },
      { question: `What food did the author eat at the stalls?`, options: [`Sushi and ramen`, `Takoyaki and shaved ice`, `Tempura and udon`, `Onigiri and miso soup`], answer: 1 },
      { question: `How did the author feel about the festival?`, options: [`Boring`, `Scary`, `Very fun`, `Too crowded`], answer: 2 },
    ],
  },
  {
    id: 'r18',
    title: 'Healthy Eating',
    level: 'N4',
    topic: 'Health',
    estimatedTime: 7,
    bodyJp: '最近、健康に気をつけるようになりました。朝ごはんは野菜と果物を食べるようにしています。間食はなるべくやめて、水をたくさん飲んでいます。週に三回、三十分ジョギングもしています。体の調子がよくなってきました。',
    bodyFurigana: 'さいきん、けんこうにきをつけるようになりました。あさごはんはやさいとくだものをたべるようにしています。かんしょくはなるべくやめて、みずをたくさんのんでいます。しゅうにさんかい、さんじゅっぷんジョギングもしています。からだのちょうしがよくなってきました。',
    bodyEn: `Recently I have started to pay attention to my health. I try to eat vegetables and fruit for breakfast. I try to avoid snacking and drink a lot of water. I also jog for thirty minutes three times a week. I have been feeling better physically.`,
    questions: [
      { question: `What does the author eat for breakfast?`, options: [`Bread and eggs`, `Vegetables and fruit`, `Cereal and milk`, `Rice and soup`], answer: 1 },
      { question: `How often does the author jog?`, options: [`Every day`, `Once a week`, `Three times a week`, `Twice a month`], answer: 2 },
      { question: `What has the author noticed recently?`, options: [`They feel more tired`, `They feel better physically`, `They lost a lot of weight`, `They sleep less`], answer: 1 },
    ],
  },
  {
    id: 'r19',
    title: 'The Tea Ceremony',
    level: 'N4',
    topic: 'Culture',
    estimatedTime: 7,
    bodyJp: '先日、茶道の体験教室に参加しました。着物を着て、静かな部屋でお茶をいただきました。お茶を点てるには細かい作法があり、最初は難しく感じましたが、先生が丁寧に教えてくださいました。日本の伝統文化の美しさを感じることができました。',
    bodyFurigana: 'せんじつ、さどうのたいけんきょうしつにさんかしました。きものをきて、しずかなへやでおちゃをいただきました。おちゃをたてるにはこまかいさほうがあり、さいしょはむずかしくかんじましたが、せんせいがていねいにおしえてくださいました。にほんのでんとうぶんかのうつくしさをかんじることができました。',
    bodyEn: `The other day I attended a tea ceremony experience class. I wore a kimono and had tea in a quiet room. There are detailed manners for making tea, and at first it felt difficult, but the teacher taught me carefully. I was able to feel the beauty of Japan's traditional culture.`,
    questions: [
      { question: `What did the author wear at the tea ceremony?`, options: [`Yukata`, `Kimono`, `Western suit`, `School uniform`], answer: 1 },
      { question: `How did the author feel about the tea-making at first?`, options: [`Easy and fun`, `Difficult`, `Boring`, `Exciting`], answer: 1 },
      { question: `What did the author feel at the end?`, options: [`The beauty of traditional culture`, `Hungry and tired`, `Disappointed`, `Confused`], answer: 0 },
    ],
  },
  {
    id: 'r20',
    title: 'Train Delay',
    level: 'N4',
    topic: 'Travel',
    estimatedTime: 7,
    bodyJp: '今朝、電車が三十分遅れました。人身事故があったためです。駅のホームにたくさんの人が待っていました。会社に遅刻しそうだったので、上司にメッセージを送りました。上司は「気をつけて来てください」と返信してくれました。',
    bodyFurigana: 'けさ、でんしゃがさんじゅっぷんおくれました。じんしんじこがあったためです。えきのホームにたくさんのひとがまっていました。かいしゃにちこくしそうだったので、じょうしにメッセージをおくりました。じょうしは「きをつけてきてください」とへんしんしてくれました。',
    bodyEn: `This morning the train was thirty minutes late due to a personal injury accident. Many people were waiting on the station platform. Since I was likely to be late for work, I sent a message to my boss. My boss replied saying please come carefully.`,
    questions: [
      { question: `Why was the train late?`, options: [`Bad weather`, `Track repair`, `Personal injury accident`, `Power outage`], answer: 2 },
      { question: `How late was the train?`, options: [`10 minutes`, `20 minutes`, `30 minutes`, `1 hour`], answer: 2 },
      { question: `What did the author do when they might be late?`, options: [`Called a taxi`, `Sent a message to their boss`, `Went back home`, `Ran to work`], answer: 1 },
    ],
  },
  {
    id: 'r21',
    title: 'Saving Money',
    level: 'N4',
    topic: 'Finance',
    estimatedTime: 7,
    bodyJp: '最近、節約を心がけています。外食を減らして、自分で料理するようにしました。コーヒーは家で作って、水筒に入れて持って行きます。毎月、給料の二割を貯金しています。半年後には旅行に行けるくらい貯まる予定です。',
    bodyFurigana: 'さいきん、せつやくをこころがけています。がいしょくをへらして、じぶんでりょうりするようにしました。コーヒーはいえでつくって、すいとうにいれてもっていきます。まいつき、きゅうりょうのにわりをちょきんしています。はんとしごにはりょこうにいけるくらいたまるよていです。',
    bodyEn: `Recently I have been trying to save money. I reduced eating out and started cooking for myself. I make coffee at home and bring it in a thermos. Every month I save twenty percent of my salary. I plan to have enough saved for a trip in six months.`,
    questions: [
      { question: `What did the author reduce to save money?`, options: [`Shopping`, `Eating out`, `Transportation`, `Entertainment`], answer: 1 },
      { question: `What percentage of salary does the author save each month?`, options: [`10%`, `15%`, `20%`, `25%`], answer: 2 },
      { question: `What does the author plan to do in six months?`, options: [`Buy a car`, `Move house`, `Go on a trip`, `Start a business`], answer: 2 },
    ],
  },
  {
    id: 'r22',
    title: 'Volunteering',
    level: 'N4',
    topic: 'Community',
    estimatedTime: 7,
    bodyJp: '月に一度、地域の清掃ボランティアに参加しています。近所の公園や川の周りのごみを拾います。最初は一人で参加しましたが、今は友達も一緒に来るようになりました。町がきれいになると気持ちがいいです。これからも続けたいと思います。',
    bodyFurigana: 'つきにいちど、ちいきのせいそうボランティアにさんかしています。きんじょのこうえんやかわのまわりのごみをひろいます。さいしょはひとりでさんかしましたが、いまはともだちもいっしょにくるようになりました。まちがきれいになるときもちがいいです。これからもつづけたいとおもいます。',
    bodyEn: `Once a month I participate in a local cleaning volunteer activity. We pick up litter around nearby parks and rivers. At first I went alone, but now my friends come with me too. It feels good when the town becomes clean. I want to continue doing this.`,
    questions: [
      { question: `How often does the author volunteer?`, options: [`Every week`, `Once a month`, `Twice a month`, `Once a year`], answer: 1 },
      { question: `Where do they clean?`, options: [`Schools and roads`, `Parks and riversides`, `Stations and malls`, `Hospitals and parks`], answer: 1 },
      { question: `Who goes with the author now?`, options: [`Family members`, `Colleagues`, `Friends`, `Nobody, still alone`], answer: 2 },
    ],
  },
  {
    id: 'r23',
    title: 'A Busy Weekend',
    level: 'N4',
    topic: 'Plans',
    estimatedTime: 7,
    bodyJp: '今週末はとても忙しかったです。土曜日は午前中に図書館で勉強して、午後は美容院に行きました。日曜日は親戚の家に遊びに行きました。夕方に帰ってから洗濯と掃除をしました。疲れましたが、充実した週末でした。',
    bodyFurigana: 'こんしゅうまつはとてもいそがしかったです。どようびはごぜんちゅうにとしょかんでべんきょうして、ごごはびようにんにいきました。にちようびはしんせきのいえにあそびにいきました。ゆうがたにかえってからせんたくとそうじをしました。つかれましたが、じゅうじつしたしゅうまつでした。',
    bodyEn: `This weekend was very busy. On Saturday morning I studied at the library and in the afternoon I went to the hair salon. On Sunday I visited a relative's house. After coming home in the evening I did laundry and cleaning. I was tired but it was a fulfilling weekend.`,
    questions: [
      { question: `What did the author do on Saturday morning?`, options: [`Went shopping`, `Studied at the library`, `Visited relatives`, `Cleaned the house`], answer: 1 },
      { question: `Where did the author go on Sunday?`, options: [`A hair salon`, `A museum`, `A relative's house`, `A park`], answer: 2 },
      { question: `How did the author feel about the weekend?`, options: [`Boring and empty`, `Fun but expensive`, `Tired but fulfilling`, `Relaxing and easy`], answer: 2 },
    ],
  },
  {
    id: 'r24',
    title: 'Working from Home',
    level: 'N4',
    topic: 'Work',
    estimatedTime: 7,
    bodyJp: '今の会社では週に二日、在宅勤務ができます。通勤時間が省けるので、その分、睡眠を多く取ることができます。ただ、家にいると集中しにくい時もあります。オンライン会議が多い日は、イヤホンが欠かせません。在宅勤務のメリットとデメリットを感じながら働いています。',
    bodyFurigana: 'いまのかいしゃではしゅうにふつか、ざいたくきんむができます。つうきんじかんがはぶけるので、そのぶん、すいみんをおおくとることができます。ただ、いえにいるとしゅうちゅうしにくいときもあります。オンラインかいぎがおおいひは、イヤホンがかかせません。ざいたくきんむのメリットとデメリットをかんじながらはたらいています。',
    bodyEn: `At my current company I can work from home two days a week. Since I save commuting time, I can sleep more instead. However, sometimes it is hard to concentrate at home. On days with many online meetings, earphones are essential. I work feeling both the advantages and disadvantages of working from home.`,
    questions: [
      { question: `How many days a week can the author work from home?`, options: [`1`, `2`, `3`, `5`], answer: 1 },
      { question: `What benefit does the author mention?`, options: [`Better food`, `More sleep`, `Higher salary`, `More vacation`], answer: 1 },
      { question: `What is essential on days with many online meetings?`, options: [`A desk`, `A printer`, `Earphones`, `A webcam`], answer: 2 },
    ],
  },
]

// ─── LISTENING EXERCISES (5) ──────────────────────────────────────────────────
export const listeningExercises: ListeningExercise[] = [
  {
    id: 'l01', title: 'At the Train Station', level: 'N5', topic: 'Travel',
    audioSrc: '/audio/l01.mp3',
    transcript: `A: すみません、東京駅はどこですか？
B: ああ、あそこの信号を左に曲がると、右側にありますよ。
A: ありがとうございます。歩いて何分くらいかかりますか？
B: だいたい五分くらいです。
A: そうですか。ありがとうございました。
B: いいえ、どういたしまして。`,
    questions: [
      { question: 'What is the person looking for?', options: ['A convenience store', 'Tokyo Station', 'A restaurant', 'A hospital'], answer: 1 },
      { question: 'How long does it take to walk there?', options: ['About 2 minutes', 'About 5 minutes', 'About 10 minutes', 'About 15 minutes'], answer: 1 },
      { question: 'Which direction should you turn at the traffic light?', options: ['Right', 'Left', 'Straight', 'U-turn'], answer: 1 },
    ],
  },
  {
    id: 'l02', title: 'Ordering Food at a Restaurant', level: 'N5', topic: 'Food',
    audioSrc: '/audio/l02.mp3',
    transcript: `ウェイター：いらっしゃいませ。ご注文はお決まりですか？
お客さん：えーと、ラーメンと餃子をひとつずつください。
ウェイター：お飲み物はいかがですか？
お客さん：お茶をお願いします。
ウェイター：かしこまりました。少々お待ちください。`,
    questions: [
      { question: 'What did the customer order to eat?', options: ['Sushi and tempura', 'Ramen and gyoza', 'Udon and rice', 'Curry and salad'], answer: 1 },
      { question: 'What drink did the customer order?', options: ['Water', 'Coffee', 'Tea', 'Juice'], answer: 2 },
      { question: 'How many ramen did the customer order?', options: ['One', 'Two', 'Three', 'Not mentioned'], answer: 0 },
    ],
  },
  {
    id: 'l03', title: 'A Phone Conversation', level: 'N5', topic: 'Daily Life',
    audioSrc: '/audio/l03.mp3',
    transcript: `A：もしもし、田中です。
B：あ、田中さん！明日の会議、何時からでしたっけ？
A：午後二時からです。場所は三階の会議室ですよ。
B：あ、そうですか。ありがとうございます。
A：はい、では明日よろしくお願いします。
B：はい、失礼します。`,
    questions: [
      { question: 'What time is the meeting tomorrow?', options: ['10 AM', '1 PM', '2 PM', '3 PM'], answer: 2 },
      { question: 'Where is the meeting room?', options: ['1st floor', '2nd floor', '3rd floor', '4th floor'], answer: 2 },
      { question: 'Who called whom?', options: ['Tanaka called B', 'B called Tanaka', 'They met in person', 'Not clear'], answer: 1 },
    ],
  },
  {
    id: 'l04', title: 'Talking About Hobbies', level: 'N4', topic: 'Hobbies',
    audioSrc: '/audio/l04.mp3',
    transcript: `A：田中さんは趣味は何ですか？
B：私は写真を撮るのが好きです。週末はよくカメラを持って公園に行きます。
A：いいですね。私は料理が好きです。最近、日本料理を作ることを練習しています。
B：それはすごいですね。いつか作ってもらえますか？
A：もちろん！今度一緒に食べましょう。`,
    questions: [
      { question: `What is Tanaka's hobby?`, options: ['Cooking', 'Photography', 'Reading', 'Sports'], answer: 1 },
      { question: 'Where does Tanaka often go on weekends?', options: ['The museum', 'The park', 'The library', 'The gym'], answer: 1 },
      { question: 'What is the other person recently practicing?', options: ['Taking photos', 'Making Italian food', 'Making Japanese food', 'Playing guitar'], answer: 2 },
    ],
  },
  {
    id: 'l05', title: 'Making Plans', level: 'N4', topic: 'Daily Life',
    audioSrc: '/audio/l05.mp3',
    transcript: `A：来週の土曜日、何か予定はありますか？
B：特にないです。どうしましたか？
A：映画を見に行きませんか？新しいアクション映画がやっているんですが。
B：いいですね！何時ごろがいいですか？
A：午後三時の回はどうですか？
B：大丈夫です。どこの映画館ですか？
A：渋谷の映画館です。駅から歩いて五分くらいです。
B：わかりました。じゃあ、映画館の前で待ち合わせましょう。`,
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
  { id:'dp03', japanese:'いただきます', furigana:'いただきます', romaji:'itadakimasu', english:`Let's eat (before a meal)`, context:'Said before eating as a gesture of gratitude for the food.' },
  { id:'dp04', japanese:'ごちそうさまでした', furigana:'ごちそうさまでした', romaji:'gochisou sama deshita', english:'Thank you for the meal (after eating)', context:'Said after finishing a meal to express thanks.' },
  { id:'dp05', japanese:'はじめまして', furigana:'はじめまして', romaji:'hajimemashite', english:'Nice to meet you (first meeting)', context:'Used only when meeting someone for the first time.' },
  { id:'dp06', japanese:'よろしくおねがいします', furigana:'よろしくおねがいします', romaji:'yoroshiku onegai shimasu', english:'Please treat me well / Nice to meet you', context:'Used after introducing yourself, or when asking someone for a favor.' },
  { id:'dp07', japanese:'ただいま', furigana:'ただいま', romaji:'tadaima', english:`I'm home!`, context:'Said when returning home. The expected response is おかえりなさい.' },
  { id:'dp08', japanese:'おかえりなさい', furigana:'おかえりなさい', romaji:'okaeri nasai', english:'Welcome back!', context:'Said in response to ただいま when someone returns home.' },
  { id:'dp09', japanese:'きをつけて', furigana:'きをつけて', romaji:'ki wo tsukete', english:'Take care / Be careful', context:'Said when someone is leaving or going somewhere, as a farewell.' },
  { id:'dp10', japanese:'どういたしまして', furigana:'どういたしまして', romaji:'dou itashimashite', english:`You're welcome`, context:'The formal response to ありがとう (thank you).' },
]

// ─── PRONUNCIATION ITEMS (10) ────────────────────────────────────────────────
export const pronunciationItems: PronunciationItem[] = [
  { id:'p01', title:'The Five Japanese Vowels', description:'Japanese has only five vowel sounds: a, i, u, e, o. Unlike English, they are always pronounced clearly and consistently.', examples:[{jp:'あ',romaji:'a (like "ah")',note:'Open mouth sound'},{jp:'い',romaji:'i (like "ee")',note:'High front vowel'},{jp:'う',romaji:'u (like "oo" but unrounded)',note:'Back vowel'},{jp:'え',romaji:'e (like "eh")',note:'Mid vowel'},{jp:'お',romaji:'o (like "oh")',note:'Round vowel'}]},
  { id:'p02', title:'Long Vowels', description:'Japanese distinguishes between short and long vowels. A long vowel is held for twice the duration. In hiragana, long vowels are written with an extra vowel character.', examples:[{jp:'おかあさん',romaji:'okaasan (mother)',note:'The "aa" is held longer'},{jp:'おとうさん',romaji:'otousan (father)',note:'The "ou" is elongated'},{jp:'えき vs. えーき',romaji:'eki vs. eeki',note:'eki = station; eeki = wrong word — length matters!'}]},
  { id:'p03', title:'Double Consonants (っ / ッ)', description:`The small っ (tsu) represents a brief pause before the following consonant. It adds emphasis and changes the word's meaning.`, examples:[{jp:'きって',romaji:'kitte (stamp)',note:'vs きて kite (come) — completely different!'},{jp:'いった',romaji:'itta (went)',note:'vs いた ita (was) — length changes meaning'},{jp:'ざっし',romaji:'zasshi (magazine)',note:'Pause before sh sound'}]},
  { id:'p04', title:'Pitch Accent Basics', description:`Japanese uses pitch accent (high-low tone patterns) rather than stress accent. The pitch pattern can change a word's meaning.`, examples:[{jp:'はし (HIGH-low)',romaji:'hashi = chopsticks',note:'High pitch on ha'},{jp:'はし (low-HIGH)',romaji:'hashi = bridge',note:'High pitch on shi'},{jp:'あめ',romaji:'ame = rain vs ame = candy',note:'Different pitch patterns'}]},
  { id:'p05', title:'The R Sound (ら り る れ ろ)', description:'The Japanese "r" is not like English "r" or "l." It is a quick tap of the tongue on the ridge behind the upper front teeth.', examples:[{jp:'ら',romaji:'ra — tongue tap',note:'Not "la" or "ra" in English'},{jp:'りんご',romaji:'ringo (apple)',note:'Soft r at beginning'},{jp:'トイレ',romaji:'toire (toilet)',note:'The r is a quick tap'}]},
  { id:'p06', title:'The N Sound (ん / ン)', description:'ん is a syllabic nasal — it forms a full mora on its own. Its exact sound depends on what comes after it.', examples:[{jp:'にほん',romaji:'nihon (Japan)',note:'Final n holds its own beat'},{jp:'さんぽ',romaji:'sanpo (stroll)',note:'n before p sounds like m'},{jp:'えんぴつ',romaji:'enpitsu (pencil)',note:'n changes based on next sound'}]},
  { id:'p07', title:'Voiced vs. Unvoiced Consonants', description:'Adding dakuten (″) to certain consonants voices them: k→g, s→z, t→d, h→b. Adding handakuten (°) to h makes p.', examples:[{jp:'か→が',romaji:'ka → ga',note:'k becomes g'},{jp:'さ→ざ',romaji:'sa → za',note:'s becomes z'},{jp:'は→ば→ぱ',romaji:'ha → ba → pa',note:'h becomes b or p'}]},
  { id:'p08', title:'Syllable Timing (Mora)', description:'Japanese is mora-timed — every mora (basic sound unit) takes roughly the same amount of time to say.', examples:[{jp:'にほんご',romaji:'ni-ho-n-go = 4 moras',note:'Each unit has equal time'},{jp:'とうきょう',romaji:'to-u-kyo-u = 4 moras',note:'Long vowels count double'},{jp:'きって',romaji:'ki-t-te = 3 moras',note:'っ counts as its own mora'}]},
  { id:'p09', title:'Silent Vowels (i and u)', description:'The vowels い and う are often devoiced (nearly silent) when they appear between or after voiceless consonants.', examples:[{jp:'です',romaji:'desu → "des" (u is silent)',note:'Very common in natural speech'},{jp:'します',romaji:'shimasu → "shimas"',note:'Final u often silent'},{jp:'すき',romaji:'suki → "ski"',note:'u is devoiced after s'}]},
  { id:'p10', title:'Shadowing Practice Tips', description:'Shadowing means repeating what you hear immediately as you listen. It is one of the best ways to improve pronunciation and natural rhythm.', examples:[{jp:'ゆっくり → 普通',romaji:'Slow → Normal speed',note:'Start slow, then match natural pace'},{jp:'リピートする',romaji:'Repeat what you hear',note:`Don't translate — just shadow`},{jp:'録音して聞く',romaji:'Record and listen back',note:'Self-monitoring improves accuracy fast'}]},
]
