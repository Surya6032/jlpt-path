import type { ReadingPassage, ListeningExercise, DailyPhrase, PronunciationItem } from '@/types'

// ─── READING PASSAGES (24) ─────────────────────────────────────────────────────
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


  {
    id: 'r06',
    title: 'My Family',
    level: 'N5',
    topic: 'Family',
    estimatedTime: 4,
    bodyJp: '私の家族は四人です。父と母と姉と私です。父は会社員で、毎日仕事に行きます。母は料理が上手です。姉は大学生です。私たちは小さい家に住んでいます。週末はみんなで公園に行きます。とても楽しいです。',
    bodyFurigana: 'わたしのかぞくはよにんです。ちちとははとあねとわたしです。ちちはかいしゃいんで、まいにちしごとにいきます。はははりょうりがじょうずです。あねはだいがくせいです。わたしたちはちいさいいえにすんでいます。しゅうまつはみんなでこうえんにいきます。とてもたのしいです。',
    bodyEn: 'My family has four people — my father, mother, older sister, and me. My father is a company employee and goes to work every day. My mother is good at cooking. My sister is a university student. We live in a small house. On weekends we all go to the park together. It is very fun.',
    questions: [
      { question: 'How many people are in the family?', options: ['Two', 'Three', 'Four', 'Five'], answer: 2 },
      { question: 'What does the father do?', options: ['He is a teacher', 'He is a company employee', 'He is a doctor', 'He stays home'], answer: 1 },
      { question: 'What do they do on weekends?', options: ['Watch TV', 'Cook together', 'Go to the park', 'Go shopping'], answer: 2 },
    ],
  },
  {
    id: 'r07',
    title: 'At the Convenience Store',
    level: 'N5',
    topic: 'Shopping',
    estimatedTime: 4,
    bodyJp: '私の家の近くにコンビニがあります。毎朝そこでパンと牛乳を買います。コンビニは二十四時間あいています。とても便利です。昨日、おにぎりとお茶を買いました。全部で三百円でした。店員さんは親切でした。',
    bodyFurigana: 'わたしのいえのちかくにコンビニがあります。まいあさそこでパンとぎゅうにゅうをかいます。コンビニはにじゅうよじかんあいています。とてもべんりです。きのう、おにぎりとおちゃをかいました。ぜんぶでさんびゃくえんでした。てんいんさんはしんせつでした。',
    bodyEn: 'There is a convenience store near my house. Every morning I buy bread and milk there. The convenience store is open 24 hours. It is very convenient. Yesterday I bought an onigiri and tea. It was 300 yen in total. The staff member was kind.',
    questions: [
      { question: 'What does the author buy every morning?', options: ['Onigiri and tea', 'Bread and milk', 'Rice and juice', 'Coffee and cake'], answer: 1 },
      { question: 'How much did yesterday purchase cost?', options: ['100 yen', '200 yen', '300 yen', '400 yen'], answer: 2 },
      { question: 'How many hours is the convenience store open?', options: ['12 hours', '18 hours', '20 hours', '24 hours'], answer: 3 },
    ],
  },
  {
    id: 'r08',
    title: 'My Favourite Hobby',
    level: 'N5',
    topic: 'Hobbies',
    estimatedTime: 4,
    bodyJp: '私の趣味は音楽を聴くことです。特にJ-POPが好きです。毎日、学校の帰りに音楽を聴きます。先週、友達と一緒にコンサートに行きました。コンサートはとても楽しかったです。歌手はとても上手でした。また行きたいです。',
    bodyFurigana: 'わたしのしゅみはおんがくをきくことです。とくにジェイポップがすきです。まいにち、がっこうのかえりにおんがくをききます。せんしゅう、ともだちといっしょにコンサートにいきました。コンサートはとてもたのしかったです。かしゅはとてもじょうずでした。またいきたいです。',
    bodyEn: 'My hobby is listening to music. I especially like J-POP. Every day I listen to music on the way home from school. Last week I went to a concert with a friend. The concert was very fun. The singer was very skilled. I want to go again.',
    questions: [
      { question: 'What is the author hobby?', options: ['Playing sports', 'Reading books', 'Listening to music', 'Cooking'], answer: 2 },
      { question: 'When does the author listen to music?', options: ['In the morning', 'During lunch', 'On the way home from school', 'Before sleeping'], answer: 2 },
      { question: 'How was the concert?', options: ['Boring', 'Very fun', 'Too long', 'Expensive'], answer: 1 },
    ],
  },
  {
    id: 'r09',
    title: 'A Letter to a Friend',
    level: 'N5',
    topic: 'Communication',
    estimatedTime: 5,
    bodyJp: 'たろうへ。元気ですか。私は元気です。来月、東京に行きます。東京は初めてです。富士山を見たいです。東京タワーにも行きたいです。一緒に行きませんか。返事を待っています。はなこより。',
    bodyFurigana: 'たろうへ。げんきですか。わたしはげんきです。らいげつ、とうきょうにいきます。とうきょうははじめてです。ふじさんをみたいです。とうきょうタワーにもいきたいです。いっしょにいきませんか。へんじをまっています。はなこより。',
    bodyEn: 'Dear Taro. How are you? I am fine. Next month I am going to Tokyo. It is my first time in Tokyo. I want to see Mt. Fuji. I also want to go to Tokyo Tower. Would you like to come together? I am waiting for your reply. From Hanako.',
    questions: [
      { question: 'When is Hanako going to Tokyo?', options: ['This week', 'Next month', 'Next year', 'Last month'], answer: 1 },
      { question: 'What does Hanako want to see?', options: ['The ocean', 'Mt. Fuji', 'Kyoto temples', 'Osaka castle'], answer: 1 },
      { question: 'What is Hanako waiting for?', options: ['A phone call', 'Money', 'A reply', 'A ticket'], answer: 2 },
    ],
  },
  {
    id: 'r10',
    title: 'My School Day',
    level: 'N5',
    topic: 'School',
    estimatedTime: 5,
    bodyJp: '私の学校は駅から歩いて十分のところにあります。授業は月曜日から金曜日まであります。一番好きな授業は数学です。お昼ご飯は友達と一緒に食べます。放課後、図書館で勉強します。家に帰るのはだいたい六時です。',
    bodyFurigana: 'わたしのがっこうはえきからあるいてじゅっぷんのところにあります。じゅぎょうはげつようびからきんようびまであります。いちばんすきなじゅぎょうはすうがくです。おひるごはんはともだちといっしょにたべます。ほうかご、としょかんでべんきょうします。いえにかえるのはだいたいろくじです。',
    bodyEn: 'My school is a ten-minute walk from the station. Classes run from Monday to Friday. My favourite class is maths. I eat lunch with my friends. After school I study in the library. I get home at around 6.',
    questions: [
      { question: 'How far is the school from the station?', options: ['5 min walk', '10 min walk', '15 min walk', '20 min walk'], answer: 1 },
      { question: 'What is the author favourite subject?', options: ['English', 'Science', 'Maths', 'Art'], answer: 2 },
      { question: 'Where does the author study after school?', options: ['At home', 'At a cafe', 'In the library', 'At a friend house'], answer: 2 },
    ],
  },
  {
    id: 'r11',
    title: 'Pets at Home',
    level: 'N5',
    topic: 'Animals',
    estimatedTime: 4,
    bodyJp: '私は猫を一匹飼っています。名前はミルクです。白くてかわいいです。毎朝エサをあげます。ミルクは魚が大好きです。遊ぶのも好きです。夜はいつも私のベッドで寝ます。とても可愛いです。',
    bodyFurigana: 'わたしはねこをいっぴきかっています。なまえはミルクです。しろくてかわいいです。まいあさエサをあげます。ミルクはさかながだいすきです。あそぶのもすきです。よるはいつもわたしのベッドでねます。とてもかわいいです。',
    bodyEn: 'I have one cat. Its name is Milk. It is white and cute. I feed it every morning. Milk loves fish. It also likes to play. At night it always sleeps on my bed. It is very adorable.',
    questions: [
      { question: 'What is the cat name?', options: ['Hana', 'Shiro', 'Milk', 'Kuro'], answer: 2 },
      { question: 'What does the cat love to eat?', options: ['Chicken', 'Fish', 'Rice', 'Vegetables'], answer: 1 },
      { question: 'Where does the cat sleep at night?', options: ['On the floor', 'In the garden', 'On the author bed', 'In a basket'], answer: 2 },
    ],
  },
  {
    id: 'r12',
    title: 'A Rainy Day',
    level: 'N5',
    topic: 'Weather',
    estimatedTime: 4,
    bodyJp: '今日は雨です。傘を持って学校に行きました。昼ごろ雨が止みました。でも空は曇っています。体育の授業は外でできませんでした。代わりに体育館でバスケットボールをしました。楽しかったです。明日は晴れるといいです。',
    bodyFurigana: 'きょうはあめです。かさをもってがっこうにいきました。ひるごろあめがやみました。でもそらはくもっています。たいいくのじゅぎょうはそとでできませんでした。かわりにたいいくかんでバスケットボールをしました。たのしかったです。あしたははれるといいです。',
    bodyEn: 'Today it is raining. I went to school with an umbrella. Around noon the rain stopped. But the sky is still cloudy. PE class could not be held outside. Instead we played basketball in the gym. It was fun. I hope it will be sunny tomorrow.',
    questions: [
      { question: 'What did the author bring to school?', options: ['A raincoat', 'An umbrella', 'Boots', 'A hat'], answer: 1 },
      { question: 'When did the rain stop?', options: ['In the morning', 'Around noon', 'In the evening', 'It did not stop'], answer: 1 },
      { question: 'What sport did they play in the gym?', options: ['Volleyball', 'Football', 'Basketball', 'Badminton'], answer: 2 },
    ],
  },
  {
    id: 'r13',
    title: 'Going to the Doctor',
    level: 'N5',
    topic: 'Health',
    estimatedTime: 5,
    bodyJp: '昨日から頭が痛かったです。熱も少しありました。だから今日は病院に行きました。医者に「のどが痛いですか」と聞かれました。薬をもらいました。帰ってから薬を飲んで、早く寝ました。今日は少し良くなりました。',
    bodyFurigana: 'きのうからあたまがいたかったです。ねつもすこしありました。だからきょうはびょういんにいきました。いしゃに「のどがいたいですか」ときかれました。くすりをもらいました。かえってからくすりをのんで、はやくねました。きょうはすこしよくなりました。',
    bodyEn: 'My head has been hurting since yesterday. I also had a slight fever. So today I went to the hospital. The doctor asked me "Does your throat hurt?" I received medicine. After getting home I took the medicine and went to bed early. Today I feel a little better.',
    questions: [
      { question: 'Why did the author go to the hospital?', options: ['Broken arm', 'Headache and fever', 'Stomach ache', 'Eye problem'], answer: 1 },
      { question: 'What did the doctor ask?', options: ['Are you eating well?', 'Do you have a cough?', 'Does your throat hurt?', 'Do you have allergies?'], answer: 2 },
      { question: 'How does the author feel today?', options: ['Worse', 'The same', 'A little better', 'Fully recovered'], answer: 2 },
    ],
  },
  {
    id: 'r14',
    title: 'Weekend Plans',
    level: 'N5',
    topic: 'Plans',
    estimatedTime: 4,
    bodyJp: '今週末は友達と映画を見に行く予定です。映画は午後二時から始まります。映画の後で、近くのレストランで夕食を食べます。友達はカレーが好きです。私はラーメンが食べたいです。とても楽しみにしています。',
    bodyFurigana: 'こんしゅうまつはともだちとえいがをみにいくよていです。えいがはごごにじからはじまります。えいがのあとで、ちかくのレストランでゆうしょくをたべます。ともだちはカレーがすきです。わたしはラーメンがたべたいです。とてもたのしみにしています。',
    bodyEn: 'This weekend I plan to go to see a movie with a friend. The movie starts at 2 PM. After the movie we will have dinner at a nearby restaurant. My friend likes curry. I want to eat ramen. I am really looking forward to it.',
    questions: [
      { question: 'What time does the movie start?', options: ['1 PM', '2 PM', '3 PM', '4 PM'], answer: 1 },
      { question: 'What does the friend like to eat?', options: ['Sushi', 'Ramen', 'Curry', 'Pizza'], answer: 2 },
      { question: 'What does the author want to eat?', options: ['Curry', 'Udon', 'Sushi', 'Ramen'], answer: 3 },
    ],
  },
  {
    id: 'r15',
    title: 'Moving to a New City',
    level: 'N4',
    topic: 'Daily Life',
    estimatedTime: 6,
    bodyJp: '先月、大阪から東京に引っ越しました。最初はとても不安でしたが、今は少し慣れてきました。近所にスーパーや図書館があって、とても便利です。新しい職場の同僚はみんな親切で、毎日楽しく働いています。ただ、大阪の友達に会えないのが少し寂しいです。来月、久しぶりに大阪に帰る予定です。',
    bodyFurigana: 'せんげつ、おおさかからとうきょうにひっこしました。さいしょはとてもふあんでしたが、いまはすこしなれてきました。きんじょにスーパーやとしょかんがあって、とてもべんりです。あたらしいしょくばのどうりょうはみんなしんせつで、まいにちたのしくはたらいています。ただ、おおさかのともだちにあえないのがすこしさびしいです。らいげつ、ひさしぶりにおおさかにかえるよていです。',
    bodyEn: 'Last month I moved from Osaka to Tokyo. At first I was very anxious, but now I have gotten a little used to it. There is a supermarket and a library nearby which is very convenient. My new colleagues at work are all kind and I enjoy working every day. However, I am a little lonely because I cannot see my friends in Osaka. Next month I plan to return to Osaka for the first time in a while.',
    questions: [
      { question: 'Where did the author move from?', options: ['Kyoto', 'Nagoya', 'Osaka', 'Fukuoka'], answer: 2 },
      { question: 'How does the author feel about their new colleagues?', options: ['They are unfriendly', 'They are kind', 'They are very busy', 'The author has not met them yet'], answer: 1 },
      { question: 'Why is the author a little lonely?', options: ['They dislike Tokyo', 'They miss Osaka food', 'They cannot see Osaka friends', 'Their family is far away'], answer: 2 },
      { question: 'What does the author plan to do next month?', options: ['Change jobs', 'Return to Osaka', 'Travel abroad', 'Learn to drive'], answer: 1 },
    ],
  },
  {
    id: 'r16',
    title: 'Learning Japanese',
    level: 'N4',
    topic: 'Study',
    estimatedTime: 6,
    bodyJp: '日本語を勉強し始めて二年になります。最初はひらがなとカタカナを覚えるのが大変でした。今は漢字も少し読めるようになりました。毎日三十分、アプリを使って練習しています。日本語が上手になったら、日本に旅行したいと思っています。特に京都の寺や神社を見てみたいです。',
    bodyFurigana: 'にほんごをべんきょうしはじめてにねんになります。さいしょはひらがなとカタカナをおぼえるのがたいへんでした。いまはかんじもすこしよめるようになりました。まいにちさんじゅっぷん、アプリをつかってれんしゅうしています。にほんごがじょうずになったら、にほんにりょこうしたいとおもっています。とくにきょうとのてらやじんじゃをみてみたいです。',
    bodyEn: 'It has been two years since I started studying Japanese. At first it was hard to memorise hiragana and katakana. Now I have become able to read a little kanji too. Every day I practise for 30 minutes using an app. When I get good at Japanese, I want to travel to Japan. I especially want to see the temples and shrines of Kyoto.',
    questions: [
      { question: 'How long has the author been studying Japanese?', options: ['One year', 'Two years', 'Three years', 'Six months'], answer: 1 },
      { question: 'How long does the author practise each day?', options: ['15 minutes', '30 minutes', '1 hour', '2 hours'], answer: 1 },
      { question: 'Where does the author want to visit in Japan?', options: ['Tokyo Disneyland', 'Osaka castle', 'Kyoto temples and shrines', 'Mt Fuji'], answer: 2 },
    ],
  },
  {
    id: 'r17',
    title: 'A Weekend in the Mountains',
    level: 'N4',
    topic: 'Nature',
    estimatedTime: 6,
    bodyJp: '先週末、家族で山にハイキングに行きました。朝五時に起きて、車で二時間かけて山に向かいました。山の空気はとても気持ちよかったです。頂上からの景色は本当に素晴らしかったです。お昼はおにぎりを食べました。帰りは少し雨が降りましたが、楽しい一日でした。',
    bodyFurigana: 'せんしゅうまつ、かぞくでやまにハイキングにいきました。あさごじにおきて、くるまでにじかんかけてやまにむかいました。やまのくうきはとてもきもちよかったです。ちょうじょうからのけしきはほんとうにすばらしかったです。おひるはおにぎりをたべました。かえりはすこしあめがふりましたが、たのしいいちにちでした。',
    bodyEn: 'Last weekend I went hiking in the mountains with my family. We woke up at 5 AM and drove for two hours to the mountains. The mountain air felt very good. The view from the summit was truly magnificent. We ate onigiri for lunch. On the way back it rained a little, but it was a fun day.',
    questions: [
      { question: 'What time did they wake up?', options: ['4 AM', '5 AM', '6 AM', '7 AM'], answer: 1 },
      { question: 'How long did the drive take?', options: ['One hour', 'Two hours', 'Three hours', 'Four hours'], answer: 1 },
      { question: 'What did they eat for lunch?', options: ['Sandwiches', 'Ramen', 'Onigiri', 'Curry'], answer: 2 },
      { question: 'What happened on the way back?', options: ['The car broke down', 'It rained a little', 'They got lost', 'Nothing happened'], answer: 1 },
    ],
  },
  {
    id: 'r18',
    title: 'Job Hunting in Japan',
    level: 'N4',
    topic: 'Work',
    estimatedTime: 7,
    bodyJp: '日本では就職活動のことを「就活」と呼びます。大学三年生の秋ごろから始まることが多いです。学生はスーツを着て、多くの会社を訪問します。面接や筆記試験を受けることもあります。内定をもらうまで何度も失敗することがありますが、あきらめずに続けることが大切です。',
    bodyFurigana: 'にほんではしゅうしょくかつどうのことを「しゅうかつ」とよびます。だいがくさんねんせいのあきごろからはじまることがおおいです。がくせいはスーツをきて、おおくのかいしゃをほうもんします。めんせつやひっきしけんをうけることもあります。ないていをもらうまでなんどもしっぱいすることがありますが、あきらめずにつづけることがたいせつです。',
    bodyEn: 'In Japan, job hunting is called shukatsu. It often begins around autumn of the third year of university. Students wear suits and visit many companies. They also take interviews and written exams. They may fail many times before receiving a job offer, but it is important to keep trying without giving up.',
    questions: [
      { question: 'What does shukatsu mean?', options: ['Studying abroad', 'Job hunting', 'Club activities', 'Part-time work'], answer: 1 },
      { question: 'When does shukatsu typically begin?', options: ['First year of uni', 'Second year summer', 'Third year autumn', 'Fourth year spring'], answer: 2 },
      { question: 'What do students wear when visiting companies?', options: ['Casual clothes', 'School uniform', 'Suits', 'Traditional clothing'], answer: 2 },
    ],
  },
  {
    id: 'r19',
    title: 'A Visit to a Japanese Festival',
    level: 'N4',
    topic: 'Culture',
    estimatedTime: 6,
    bodyJp: '夏祭りに行ってきました。浴衣を着て、友達と一緒に出かけました。屋台にはたこ焼きやかき氷など、いろいろな食べ物がありました。花火も見ました。とても綺麗でした。日本の夏祭りは子供から大人まで楽しめます。来年もぜひ行きたいです。',
    bodyFurigana: 'なつまつりにいってきました。ゆかたをきて、ともだちといっしょにでかけました。やたいにはたこやきやかきごおりなど、いろいろなたべものがありました。はなびもみました。とてもきれいでした。にほんのなつまつりはこどもからおとなまでたのしめます。らいねんもぜひいきたいです。',
    bodyEn: 'I went to a summer festival. I wore a yukata and went out with friends. The food stalls had various foods like takoyaki and shaved ice. We also watched fireworks. It was very beautiful. Japanese summer festivals can be enjoyed by everyone from children to adults. I definitely want to go again next year.',
    questions: [
      { question: 'What did the author wear to the festival?', options: ['Kimono', 'Yukata', 'Suit', 'Casual clothes'], answer: 1 },
      { question: 'What did the author watch at the festival?', options: ['A parade', 'A dance show', 'Fireworks', 'Sumo wrestling'], answer: 2 },
      { question: 'Who can enjoy Japanese summer festivals?', options: ['Only children', 'Only adults', 'Only locals', 'Everyone from children to adults'], answer: 3 },
    ],
  },
  {
    id: 'r20',
    title: 'Healthy Eating Habits',
    level: 'N4',
    topic: 'Health',
    estimatedTime: 6,
    bodyJp: '最近、健康のために食生活を変えました。朝ごはんは必ず食べるようにしています。野菜と魚を多く食べて、脂っこい食べ物はなるべく避けています。また、毎日三十分ほど散歩することにしました。この生活を始めてから、体の調子がずいぶん良くなりました。',
    bodyFurigana: 'さいきん、けんこうのためにしょくせいかつをかえました。あさごはんはかならずたべるようにしています。やさいとさかなをおおくたべて、あぶらっこいたべものはなるべくさけています。また、まいにちさんじゅっぷんほどさんぽすることにしました。このせいかつをはじめてから、からだのちょうしがずいぶんよくなりました。',
    bodyEn: 'Recently I changed my eating habits for the sake of my health. I make sure to always eat breakfast. I eat a lot of vegetables and fish and try to avoid greasy food as much as possible. I also decided to walk for about 30 minutes every day. Since starting this lifestyle, my physical condition has improved greatly.',
    questions: [
      { question: 'Why did the author change their eating habits?', options: ['To save money', 'For their health', 'Because of a doctor order', 'To lose weight for an event'], answer: 1 },
      { question: 'What foods does the author eat more of?', options: ['Meat and dairy', 'Bread and rice', 'Vegetables and fish', 'Sweets and snacks'], answer: 2 },
      { question: 'How long does the author walk each day?', options: ['15 minutes', '30 minutes', '1 hour', '2 hours'], answer: 1 },
    ],
  },
  {
    id: 'r21',
    title: 'Japanese Tea Ceremony',
    level: 'N4',
    topic: 'Culture',
    estimatedTime: 7,
    bodyJp: '茶道は日本の伝統文化の一つです。抹茶をたてて、お客さんに出す作法を学びます。動きは非常にゆっくりで、細かいルールがあります。先週、友達と一緒に茶道体験をしました。最初は難しく感じましたが、先生が丁寧に教えてくれたおかげで、なんとかお茶をたてることができました。',
    bodyFurigana: 'さどうはにほんのでんとうぶんかのひとつです。まっちゃをたてて、おきゃくさんにだすさほうをまなびます。うごきはひじょうにゆっくりで、こまかいルールがあります。せんしゅう、ともだちといっしょにさどうたいけんをしました。さいしょはむずかしくかんじましたが、せんせいがていねいにおしえてくれたおかげで、なんとかおちゃをたてることができました。',
    bodyEn: 'The tea ceremony is one of Japan traditional cultural practices. You learn the etiquette of preparing matcha and serving it to guests. The movements are very slow and there are detailed rules. Last week I did a tea ceremony experience with a friend. At first I found it difficult, but thanks to the teacher explaining it carefully, I was somehow able to prepare the tea.',
    questions: [
      { question: 'What kind of tea is used in the tea ceremony?', options: ['Sencha', 'Matcha', 'Hojicha', 'Barley tea'], answer: 1 },
      { question: 'How are the movements in the tea ceremony?', options: ['Fast and energetic', 'Very slow with detailed rules', 'Free and improvised', 'Moderate pace'], answer: 1 },
      { question: 'How did the author feel at first?', options: ['Excited', 'Bored', 'Difficult', 'Confident'], answer: 2 },
    ],
  },
  {
    id: 'r22',
    title: 'A Train Delay',
    level: 'N4',
    topic: 'Transportation',
    estimatedTime: 6,
    bodyJp: '今朝、電車が大幅に遅延しました。信号トラブルが原因だったようです。駅のアナウンスによると、約四十分の遅れとのことでした。ホームにはたくさんの人が待っていました。会社に連絡して、遅刻することを伝えました。上司は理解してくれました。日本では電車の遅延は珍しいことなので、驚きました。',
    bodyFurigana: 'けさ、でんしゃがおおはばにちえんしました。しんごうトラブルがげんいんだったようです。えきのアナウンスによると、やくよんじゅっぷんのおくれとのことでした。ホームにはたくさんのひとがまっていました。かいしゃにれんらくして、ちこくすることをつたえました。じょうしはりかいしてくれました。にほんではでんしゃのちえんはめずらしいことなので、おどろきました。',
    bodyEn: 'This morning the train was significantly delayed. It seems a signal problem was the cause. According to the station announcement, the delay was about 40 minutes. Many people were waiting on the platform. I contacted my company and told them I would be late. My boss understood. Since train delays are rare in Japan, I was surprised.',
    questions: [
      { question: 'What caused the train delay?', options: ['A typhoon', 'A signal problem', 'An accident', 'Track maintenance'], answer: 1 },
      { question: 'How long was the delay?', options: ['About 20 minutes', 'About 30 minutes', 'About 40 minutes', 'About 60 minutes'], answer: 2 },
      { question: 'How did the boss react?', options: ['Got angry', 'Did not respond', 'Understood', 'Asked the author to work overtime'], answer: 2 },
    ],
  },
  {
    id: 'r23',
    title: 'Saving Money in Japan',
    level: 'N4',
    topic: 'Money',
    estimatedTime: 6,
    bodyJp: '最近、節約を心がけています。コンビニで買うのをやめて、自炊するようにしました。また、不要なサブスクリプションを解約しました。月に一度は家計簿をつけて、出費を確認しています。この方法で、毎月一万円ほど節約できるようになりました。将来のために、貯金を増やしたいと思っています。',
    bodyFurigana: 'さいきん、せつやくをこころがけています。コンビニでかうのをやめて、じすいするようにしました。また、ふようなサブスクリプションをかいやくしました。つきにいちどはかけいぼをつけて、ししゅつをかくにんしています。このほうほうで、まいつきいちまんえんほどせつやくできるようになりました。しょうらいのために、ちょきんをふやしたいとおもっています。',
    bodyEn: 'Recently I have been trying to save money. I stopped buying at convenience stores and started cooking for myself. I also cancelled unnecessary subscriptions. Once a month I keep a household budget book and check my expenses. With this method I have been able to save about 10,000 yen per month. I want to increase my savings for the future.',
    questions: [
      { question: 'What did the author stop doing to save money?', options: ['Eating out at restaurants', 'Buying at convenience stores', 'Using public transport', 'Going to movies'], answer: 1 },
      { question: 'How often does the author check their budget book?', options: ['Every day', 'Every week', 'Once a month', 'Twice a year'], answer: 2 },
      { question: 'How much does the author save per month?', options: ['5,000 yen', '8,000 yen', '10,000 yen', '20,000 yen'], answer: 2 },
    ],
  },
  {
    id: 'r24',
    title: 'Volunteering in the Community',
    level: 'N4',
    topic: 'Community',
    estimatedTime: 7,
    bodyJp: '毎月第一土曜日に、地域の清掃ボランティアに参加しています。公園や川の周りのゴミを拾います。最初は一人で始めましたが、今では十五人ほどのグループになりました。地域の人々に感謝されることが、とてもやりがいを感じます。環境を守るために、これからも続けていきたいと思っています。',
    bodyFurigana: 'まいつきだいいちどようびに、ちいきのせいそうボランティアにさんかしています。こうえんやかわのまわりのゴミをひろいます。さいしょはひとりではじめましたが、いまではじゅうごにんほどのグループになりました。ちいきのひとびとにかんしゃされることが、とてもやりがいをかんじます。かんきょうをまもるために、これからもつづけていきたいとおもっています。',
    bodyEn: 'Every first Saturday of the month I participate in a community clean-up volunteer activity. I pick up rubbish around parks and rivers. At first I started alone, but now the group has grown to about 15 people. Being thanked by the people in the community gives me a great sense of purpose. I want to continue doing this in order to protect the environment.',
    questions: [
      { question: 'When does the volunteer activity take place?', options: ['Every Sunday', 'Every first Saturday', 'Every last Friday', 'Twice a month'], answer: 1 },
      { question: 'How many people are in the group now?', options: ['About 5', 'About 10', 'About 15', 'About 20'], answer: 2 },
      { question: 'Why does the author want to continue?', options: ['To earn money', 'To make friends', 'To protect the environment', 'To get exercise'], answer: 2 },
    ],
  },

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
