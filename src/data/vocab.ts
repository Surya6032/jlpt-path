import type {
  HiraganaItem, KatakanaItem, VocabWord, KanjiItem,
  GrammarPoint, ReadingPassage, ListeningExercise,
  QuizQuestion, MockTest, DailyPhrase, PronunciationItem
} from '@/types'

export const hiraganaData: HiraganaItem[] = [
  { id:'h01', character:'あ', romaji:'a',  example:'あめ', exampleMeaning:'rain' },
  { id:'h02', character:'い', romaji:'i',  example:'いぬ', exampleMeaning:'dog' },
  { id:'h03', character:'う', romaji:'u',  example:'うみ', exampleMeaning:'sea' },
  { id:'h04', character:'え', romaji:'e',  example:'えき', exampleMeaning:'station' },
  { id:'h05', character:'お', romaji:'o',  example:'おと', exampleMeaning:'sound' },
  { id:'h06', character:'か', romaji:'ka', example:'かさ', exampleMeaning:'umbrella' },
  { id:'h07', character:'き', romaji:'ki', example:'きて', exampleMeaning:'tree' },
  { id:'h08', character:'く', romaji:'ku', example:'くも', exampleMeaning:'cloud' },
  { id:'h09', character:'け', romaji:'ke', example:'けむり',exampleMeaning:'smoke' },
  { id:'h10', character:'こ', romaji:'ko', example:'こえ', exampleMeaning:'voice' },
  { id:'h11', character:'さ', romaji:'sa', example:'さかな',exampleMeaning:'fish' },
  { id:'h12', character:'し', romaji:'shi',example:'しお', exampleMeaning:'salt' },
  { id:'h13', character:'す', romaji:'su', example:'すし', exampleMeaning:'sushi' },
  { id:'h14', character:'せ', romaji:'se', example:'せかい',exampleMeaning:'world' },
  { id:'h15', character:'そ', romaji:'so', example:'そら', exampleMeaning:'sky' },
  { id:'h16', character:'た', romaji:'ta', example:'たべる',exampleMeaning:'to eat' },
  { id:'h17', character:'な', romaji:'na', example:'なまえ',exampleMeaning:'name' },
  { id:'h18', character:'は', romaji:'ha', example:'はな', exampleMeaning:'flower' },
  { id:'h19', character:'ま', romaji:'ma', example:'まち', exampleMeaning:'town' },
  { id:'h20', character:'や', romaji:'ya', example:'やま', exampleMeaning:'mountain' },
]

export const katakanaData: KatakanaItem[] = [
  { id:'k01', character:'ア', romaji:'a',  example:'アイス', exampleMeaning:'ice cream' },
  { id:'k02', character:'イ', romaji:'i',  example:'イギリス',exampleMeaning:'England' },
  { id:'k03', character:'ウ', romaji:'u',  example:'ウイスキー',exampleMeaning:'whisky' },
  { id:'k04', character:'エ', romaji:'e',  example:'エアコン',exampleMeaning:'air conditioner' },
  { id:'k05', character:'オ', romaji:'o',  example:'オレンジ',exampleMeaning:'orange' },
  { id:'k06', character:'カ', romaji:'ka', example:'カメラ', exampleMeaning:'camera' },
  { id:'k07', character:'キ', romaji:'ki', example:'キッチン',exampleMeaning:'kitchen' },
  { id:'k08', character:'ク', romaji:'ku', example:'クラス', exampleMeaning:'class' },
  { id:'k09', character:'ケ', romaji:'ke', example:'ケーキ', exampleMeaning:'cake' },
  { id:'k10', character:'コ', romaji:'ko', example:'コーヒー',exampleMeaning:'coffee' },
  { id:'k11', character:'サ', romaji:'sa', example:'サッカー',exampleMeaning:'soccer' },
  { id:'k12', character:'シ', romaji:'shi',example:'シャワー',exampleMeaning:'shower' },
  { id:'k13', character:'ス', romaji:'su', example:'スマホ', exampleMeaning:'smartphone' },
  { id:'k14', character:'セ', romaji:'se', example:'セーター',exampleMeaning:'sweater' },
  { id:'k15', character:'ソ', romaji:'so', example:'ソファ', exampleMeaning:'sofa' },
  { id:'k16', character:'タ', romaji:'ta', example:'タクシー',exampleMeaning:'taxi' },
  { id:'k17', character:'テ', romaji:'te', example:'テスト', exampleMeaning:'test' },
  { id:'k18', character:'ナ', romaji:'na', example:'ナイフ', exampleMeaning:'knife' },
  { id:'k19', character:'ハ', romaji:'ha', example:'ハンバーガー',exampleMeaning:'hamburger' },
  { id:'k20', character:'マ', romaji:'ma', example:'マスク', exampleMeaning:'mask' },
]

export const vocabData: VocabWord[] = [
  // ── N5 Numbers ──
  { id:'v001', japanese:'零', furigana:'ぜろ・れい', romaji:'zero / rei', english:'zero', level:'N5', category:'Numbers', example:'零は数字です。', exampleEn:'Zero is a number.', mnemonic:'A zero circle, レイ like a ray of light = nothing.' },
  { id:'v002', japanese:'一', furigana:'いち', romaji:'ichi', english:'one', level:'N5', category:'Numbers', example:'一つください。', exampleEn:'One please.', mnemonic:'One stroke = one.' },
  { id:'v003', japanese:'二', furigana:'に', romaji:'ni', english:'two', level:'N5', category:'Numbers', example:'二人います。', exampleEn:'There are two people.', mnemonic:'Two horizontal strokes = two.' },
  { id:'v004', japanese:'三', furigana:'さん', romaji:'san', english:'three', level:'N5', category:'Numbers', example:'三時です。', exampleEn:'It is three o\'clock.', mnemonic:'Three strokes = three.' },
  { id:'v005', japanese:'四', furigana:'し・よん', romaji:'shi / yon', english:'four', level:'N5', category:'Numbers', example:'四月は春です。', exampleEn:'April is spring.', mnemonic:'Four corners in the kanji box.' },
  { id:'v006', japanese:'五', furigana:'ご', romaji:'go', english:'five', level:'N5', category:'Numbers', example:'五円玉。', exampleEn:'A 5-yen coin.', mnemonic:'Go forward five steps.' },
  { id:'v007', japanese:'六', furigana:'ろく', romaji:'roku', english:'six', level:'N5', category:'Numbers', example:'六本あります。', exampleEn:'There are six (long things).', mnemonic:'ROck UK = six rocky steps.' },
  { id:'v008', japanese:'七', furigana:'しち・なな', romaji:'shichi / nana', english:'seven', level:'N5', category:'Numbers', example:'七時に起きます。', exampleEn:'I wake up at seven.', mnemonic:'Shichi sounds like "she chi" — lucky seven.' },
  { id:'v009', japanese:'八', furigana:'はち', romaji:'hachi', english:'eight', level:'N5', category:'Numbers', example:'八月は夏です。', exampleEn:'August is summer.', mnemonic:'HAchi — HAnd with 8 fingers spread.' },
  { id:'v010', japanese:'九', furigana:'く・きゅう', romaji:'ku / kyuu', english:'nine', level:'N5', category:'Numbers', example:'九時です。', exampleEn:'It is nine o\'clock.', mnemonic:'KYUUte number nine.' },
  { id:'v011', japanese:'十', furigana:'じゅう', romaji:'juu', english:'ten', level:'N5', category:'Numbers', example:'十円です。', exampleEn:'It is ten yen.', mnemonic:'A cross = ten (like Roman X).' },
  { id:'v012', japanese:'百', furigana:'ひゃく', romaji:'hyaku', english:'hundred', level:'N5', category:'Numbers', example:'百円ショップ。', exampleEn:'100-yen shop.', mnemonic:'HYAKu — a hundred yakults.' },
  { id:'v013', japanese:'千', furigana:'せん', romaji:'sen', english:'thousand', level:'N5', category:'Numbers', example:'千円です。', exampleEn:'It is 1000 yen.', mnemonic:'SEN — senator earns thousands.' },
  { id:'v014', japanese:'万', furigana:'まん', romaji:'man', english:'ten thousand', level:'N5', category:'Numbers', example:'一万円。', exampleMeaning:'10,000 yen.', exampleEn:'10,000 yen.' },

  // ── N5 Greetings ──
  { id:'v020', japanese:'おはようございます', furigana:'おはようございます', romaji:'ohayou gozaimasu', english:'Good morning (formal)', level:'N5', category:'Greetings', example:'おはようございます！', exampleEn:'Good morning!', mnemonic:'O-HA-YO — "Oh! Hi yo!" every morning.' },
  { id:'v021', japanese:'こんにちは', furigana:'こんにちは', romaji:'konnichiwa', english:'Hello / Good afternoon', level:'N5', category:'Greetings', example:'こんにちは、元気ですか？', exampleEn:'Hello, how are you?', mnemonic:'KONNICHIWA — "Come, nichi, wa!" greet the day.' },
  { id:'v022', japanese:'こんばんは', furigana:'こんばんは', romaji:'konbanwa', english:'Good evening', level:'N5', category:'Greetings', example:'こんばんは！', exampleEn:'Good evening!', mnemonic:'KONBAN — "Come, ban!" ban the daylight.' },
  { id:'v023', japanese:'ありがとうございます', furigana:'ありがとうございます', romaji:'arigatou gozaimasu', english:'Thank you very much', level:'N5', category:'Greetings', example:'ありがとうございます！', exampleEn:'Thank you very much!', mnemonic:'Ari-GAto — "Are we grateful? OH yes!"' },
  { id:'v024', japanese:'すみません', furigana:'すみません', romaji:'sumimasen', english:'Excuse me / Sorry', level:'N5', category:'Greetings', example:'すみません、駅はどこですか？', exampleEn:'Excuse me, where is the station?', mnemonic:'SUMI-MASEN — "Sooty mason?" Sorry!' },
  { id:'v025', japanese:'はい', furigana:'はい', romaji:'hai', english:'Yes', level:'N5', category:'Greetings', example:'はい、そうです。', exampleEn:'Yes, that\'s right.', mnemonic:'HAI — "Hi!" = yes.' },
  { id:'v026', japanese:'いいえ', furigana:'いいえ', romaji:'iie', english:'No', level:'N5', category:'Greetings', example:'いいえ、違います。', exampleEn:'No, that\'s wrong.', mnemonic:'IIE — "Ee-yeah?" No way!' },
  { id:'v027', japanese:'さようなら', furigana:'さようなら', romaji:'sayounara', english:'Goodbye', level:'N5', category:'Greetings', example:'さようなら！', exampleEn:'Goodbye!', mnemonic:'Sayounara — "Say your narration" before you leave.' },
  { id:'v028', japanese:'またね', furigana:'またね', romaji:'mata ne', english:'See you later', level:'N5', category:'Greetings', example:'またね！', exampleEn:'See you later!', mnemonic:'MATA — "matter" of time before we meet again.' },

  // ── N5 Family ──
  { id:'v030', japanese:'家族', furigana:'かぞく', romaji:'kazoku', english:'family', level:'N5', category:'Family', example:'私の家族は四人です。', exampleEn:'My family has four members.', mnemonic:'KA-ZO-KU — kazoo family band.' },
  { id:'v031', japanese:'父', furigana:'ちち', romaji:'chichi', english:'father (own)', level:'N5', category:'Family', example:'父は会社員です。', exampleEn:'My father is an office worker.', mnemonic:'CHICHI — "cheechee" — dad making funny noises.' },
  { id:'v032', japanese:'母', furigana:'はは', romaji:'haha', english:'mother (own)', level:'N5', category:'Family', example:'母は料理が上手です。', exampleEn:'My mother is good at cooking.', mnemonic:'HAHA — mom laughing "haha".' },
  { id:'v033', japanese:'兄', furigana:'あに', romaji:'ani', english:'older brother (own)', level:'N5', category:'Family', example:'兄は大学生です。', exampleEn:'My older brother is a university student.', mnemonic:'ANI — "Annie" had an older brother.' },
  { id:'v034', japanese:'姉', furigana:'あね', romaji:'ane', english:'older sister (own)', level:'N5', category:'Family', example:'姉は先生です。', exampleEn:'My older sister is a teacher.', mnemonic:'ANE — "Annie" is older.' },
  { id:'v035', japanese:'弟', furigana:'おとうと', romaji:'otouto', english:'younger brother', level:'N5', category:'Family', example:'弟は小学生です。', exampleEn:'My younger brother is in elementary school.', mnemonic:'OTOUTO — "oh, two-to" little brothers.' },
  { id:'v036', japanese:'妹', furigana:'いもうと', romaji:'imouto', english:'younger sister', level:'N5', category:'Family', example:'妹はかわいいです。', exampleEn:'My younger sister is cute.', mnemonic:'IMOUTO — "I mooted" having a little sis.' },
  { id:'v037', japanese:'子供', furigana:'こども', romaji:'kodomo', english:'child', level:'N5', category:'Family', example:'子供が公園で遊んでいます。', exampleEn:'The child is playing in the park.', mnemonic:'KODOMO — "code-o-mo" little code monkey.' },

  // ── N5 Food ──
  { id:'v040', japanese:'ご飯', furigana:'ごはん', romaji:'gohan', english:'rice / meal', level:'N5', category:'Food', example:'ご飯を食べます。', exampleEn:'I eat rice/a meal.', mnemonic:'GOHAN — "go, hon!" Rice is the foundation.' },
  { id:'v041', japanese:'水', furigana:'みず', romaji:'mizu', english:'water', level:'N5', category:'Food', example:'水を飲みます。', exampleEn:'I drink water.', mnemonic:'MIZU — "me zoo" drinking water all day.' },
  { id:'v042', japanese:'お茶', furigana:'おちゃ', romaji:'ocha', english:'tea', level:'N5', category:'Food', example:'お茶を飲みませんか？', exampleEn:'Would you like some tea?', mnemonic:'OCHA — "oh cha-cha!" tea dance.' },
  { id:'v043', japanese:'牛乳', furigana:'ぎゅうにゅう', romaji:'gyuunyuu', english:'milk', level:'N5', category:'Food', example:'牛乳は体にいいです。', exampleEn:'Milk is good for your body.', mnemonic:'GYU-NYU — "goo-new" white liquid.' },
  { id:'v044', japanese:'パン', furigana:'パン', romaji:'pan', english:'bread', level:'N5', category:'Food', example:'朝食にパンを食べます。', exampleEn:'I eat bread for breakfast.', mnemonic:'PAN — pan-baked bread.' },
  { id:'v045', japanese:'肉', furigana:'にく', romaji:'niku', english:'meat', level:'N5', category:'Food', example:'肉が好きです。', exampleEn:'I like meat.', mnemonic:'NIKU — "Nick U" grilling meat.' },
  { id:'v046', japanese:'魚', furigana:'さかな', romaji:'sakana', english:'fish', level:'N5', category:'Food', example:'魚を食べます。', exampleEn:'I eat fish.', mnemonic:'SAKANA — "suck a nah" fisherman.' },
  { id:'v047', japanese:'野菜', furigana:'やさい', romaji:'yasai', english:'vegetables', level:'N5', category:'Food', example:'野菜は体にいいです。', exampleEn:'Vegetables are good for your body.', mnemonic:'YASAI — "ya-sigh" eating veggies again.' },
  { id:'v048', japanese:'果物', furigana:'くだもの', romaji:'kudamono', english:'fruit', level:'N5', category:'Food', example:'果物が好きです。', exampleEn:'I like fruit.', mnemonic:'KUDAMONO — "good-a-mono" good fruit.' },
  { id:'v049', japanese:'卵', furigana:'たまご', romaji:'tamago', english:'egg', level:'N5', category:'Food', example:'卵を食べます。', exampleEn:'I eat eggs.', mnemonic:'TAMAGO — "ta-ma-go" egg tamagotchi.' },
  { id:'v050', japanese:'寿司', furigana:'すし', romaji:'sushi', english:'sushi', level:'N5', category:'Food', example:'寿司が大好きです。', exampleEn:'I love sushi.', mnemonic:'SUSHI — everyone knows sushi!' },
  { id:'v051', japanese:'ラーメン', furigana:'らーめん', romaji:'raamen', english:'ramen', level:'N5', category:'Food', example:'ラーメンを食べたいです。', exampleEn:'I want to eat ramen.', mnemonic:'RAAMEN — "raw men" in a noodle bowl.' },

  // ── N5 Colors ──
  { id:'v060', japanese:'赤', furigana:'あか', romaji:'aka', english:'red', level:'N5', category:'Colors', example:'赤いりんごです。', exampleEn:'It is a red apple.', mnemonic:'AKA — "ah-KA!" red hot.' },
  { id:'v061', japanese:'青', furigana:'あお', romaji:'ao', english:'blue / green', level:'N5', category:'Colors', example:'空は青いです。', exampleEn:'The sky is blue.', mnemonic:'AO — "ow!" blue sky hurts your eyes.' },
  { id:'v062', japanese:'白', furigana:'しろ', romaji:'shiro', english:'white', level:'N5', category:'Colors', example:'白い雪です。', exampleEn:'It is white snow.', mnemonic:'SHIRO — "she-row" white row of snow.' },
  { id:'v063', japanese:'黒', furigana:'くろ', romaji:'kuro', english:'black', level:'N5', category:'Colors', example:'黒い猫です。', exampleEn:'It is a black cat.', mnemonic:'KURO — "cruel" black darkness.' },
  { id:'v064', japanese:'黄色', furigana:'きいろ', romaji:'kiiro', english:'yellow', level:'N5', category:'Colors', example:'黄色いバナナです。', exampleEn:'It is a yellow banana.', mnemonic:'KIIRO — "key-roe" golden key.' },
  { id:'v065', japanese:'緑', furigana:'みどり', romaji:'midori', english:'green', level:'N5', category:'Colors', example:'緑の木です。', exampleEn:'It is a green tree.', mnemonic:'MIDORI — "me-dori" green melon liqueur.' },

  // ── N5 Time ──
  { id:'v070', japanese:'今日', furigana:'きょう', romaji:'kyou', english:'today', level:'N5', category:'Time', example:'今日は月曜日です。', exampleEn:'Today is Monday.', mnemonic:'KYOU — "cue" for today.' },
  { id:'v071', japanese:'明日', furigana:'あした', romaji:'ashita', english:'tomorrow', level:'N5', category:'Time', example:'明日学校があります。', exampleEn:'There is school tomorrow.', mnemonic:'ASHITA — "a-she-ta" tomorrow she arrives.' },
  { id:'v072', japanese:'昨日', furigana:'きのう', romaji:'kinou', english:'yesterday', level:'N5', category:'Time', example:'昨日映画を見ました。', exampleEn:'I watched a movie yesterday.', mnemonic:'KINOU — "keen-o" yesterday was keen.' },
  { id:'v073', japanese:'今', furigana:'いま', romaji:'ima', english:'now', level:'N5', category:'Time', example:'今何時ですか？', exampleEn:'What time is it now?', mnemonic:'IMA — "I\'m a" doing it NOW.' },
  { id:'v074', japanese:'朝', furigana:'あさ', romaji:'asa', english:'morning', level:'N5', category:'Time', example:'朝ご飯を食べます。', exampleEn:'I eat breakfast in the morning.', mnemonic:'ASA — "ah-sah!" morning surprise.' },
  { id:'v075', japanese:'昼', furigana:'ひる', romaji:'hiru', english:'noon / daytime', level:'N5', category:'Time', example:'昼ご飯を食べます。', exampleEn:'I eat lunch at noon.', mnemonic:'HIRU — "he-rue" noon regrets.' },
  { id:'v076', japanese:'夜', furigana:'よる', romaji:'yoru', english:'night / evening', level:'N5', category:'Time', example:'夜寝ます。', exampleEn:'I sleep at night.', mnemonic:'YORU — "yo-ru!" night call.' },
  { id:'v077', japanese:'週末', furigana:'しゅうまつ', romaji:'shuumatsu', english:'weekend', level:'N5', category:'Time', example:'週末に旅行します。', exampleEn:'I travel on the weekend.', mnemonic:'SHUUMATSU — "shoe-mat-su" wipe shoes on weekend.' },

  // ── N5 Places ──
  { id:'v080', japanese:'学校', furigana:'がっこう', romaji:'gakkou', english:'school', level:'N5', category:'Places', example:'学校に行きます。', exampleEn:'I go to school.', mnemonic:'GAKKOU — "gawk-oh" gawk at school.' },
  { id:'v081', japanese:'家', furigana:'うち・いえ', romaji:'uchi / ie', english:'house / home', level:'N5', category:'Places', example:'家に帰ります。', exampleEn:'I return home.', mnemonic:'UCHI — "oo-chee" snug home.' },
  { id:'v082', japanese:'駅', furigana:'えき', romaji:'eki', english:'station', level:'N5', category:'Places', example:'駅はどこですか？', exampleEn:'Where is the station?', mnemonic:'EKI — "eek-ee!" rushing to the station.' },
  { id:'v083', japanese:'病院', furigana:'びょういん', romaji:'byouin', english:'hospital', level:'N5', category:'Places', example:'病院に行きます。', exampleEn:'I go to the hospital.', mnemonic:'BYOUIN — "beyond" sickness = hospital.' },
  { id:'v084', japanese:'銀行', furigana:'ぎんこう', romaji:'ginkou', english:'bank', level:'N5', category:'Places', example:'銀行でお金をおろします。', exampleEn:'I withdraw money at the bank.', mnemonic:'GINKOU — "gin-co" silver company = bank.' },
  { id:'v085', japanese:'図書館', furigana:'としょかん', romaji:'toshokan', english:'library', level:'N5', category:'Places', example:'図書館で勉強します。', exampleEn:'I study at the library.', mnemonic:'TOSHOKAN — "toss-o-can" tossing books.' },
  { id:'v086', japanese:'公園', furigana:'こうえん', romaji:'kouen', english:'park', level:'N5', category:'Places', example:'公園で遊びます。', exampleEn:'I play at the park.', mnemonic:'KOUEN — "go-en" go to the park.' },
  { id:'v087', japanese:'スーパー', furigana:'スーパー', romaji:'suupaa', english:'supermarket', level:'N5', category:'Places', example:'スーパーで野菜を買います。', exampleEn:'I buy vegetables at the supermarket.', mnemonic:'SUUPAA — "super" market.' },
  { id:'v088', japanese:'レストラン', furigana:'レストラン', romaji:'resutoran', english:'restaurant', level:'N5', category:'Places', example:'レストランで食べます。', exampleEn:'I eat at a restaurant.', mnemonic:'RESUTORAN — "restaurant" in katakana.' },

  // ── N5 Adjectives ──
  { id:'v090', japanese:'大きい', furigana:'おおきい', romaji:'ookii', english:'big / large', level:'N5', category:'Adjectives', example:'大きい犬です。', exampleEn:'It is a big dog.', mnemonic:'OOKII — "oo-key" big key for a big door.' },
  { id:'v091', japanese:'小さい', furigana:'ちいさい', romaji:'chiisai', english:'small / little', level:'N5', category:'Adjectives', example:'小さい猫です。', exampleEn:'It is a small cat.', mnemonic:'CHIISAI — "chee-sigh" tiny little sigh.' },
  { id:'v092', japanese:'高い', furigana:'たかい', romaji:'takai', english:'expensive / tall', level:'N5', category:'Adjectives', example:'高いビルです。', exampleEn:'It is a tall building.', mnemonic:'TAKAI — "ta-kye" tower high up.' },
  { id:'v093', japanese:'安い', furigana:'やすい', romaji:'yasui', english:'cheap / inexpensive', level:'N5', category:'Adjectives', example:'安いです！', exampleEn:'It is cheap!', mnemonic:'YASUI — "ya-sooey" cheap leftovers.' },
  { id:'v094', japanese:'いい', furigana:'いい', romaji:'ii', english:'good', level:'N5', category:'Adjectives', example:'いい天気ですね。', exampleEn:'It is nice weather, isn\'t it?', mnemonic:'II — "ee" = yes, good!' },
  { id:'v095', japanese:'悪い', furigana:'わるい', romaji:'warui', english:'bad', level:'N5', category:'Adjectives', example:'天気が悪いです。', exampleEn:'The weather is bad.', mnemonic:'WARUI — "war-ee" war is bad.' },
  { id:'v096', japanese:'新しい', furigana:'あたらしい', romaji:'atarashii', english:'new', level:'N5', category:'Adjectives', example:'新しい車です。', exampleEn:'It is a new car.', mnemonic:'ATARASHII — "a-ta-rash-ee" new rash of things.' },
  { id:'v097', japanese:'古い', furigana:'ふるい', romaji:'furui', english:'old (things)', level:'N5', category:'Adjectives', example:'古い本です。', exampleEn:'It is an old book.', mnemonic:'FURUI — "foo-roo-ee" old fool.' },
  { id:'v098', japanese:'暑い', furigana:'あつい', romaji:'atsui', english:'hot (weather)', level:'N5', category:'Adjectives', example:'今日は暑いです。', exampleEn:'It is hot today.', mnemonic:'ATSUI — "at-sooey!" hot mess.' },
  { id:'v099', japanese:'寒い', furigana:'さむい', romaji:'samui', english:'cold (weather)', level:'N5', category:'Adjectives', example:'今日は寒いです。', exampleEn:'It is cold today.', mnemonic:'SAMUI — "same-ee" same cold every winter.' },

  // ── N5 Verbs ──
  { id:'v100', japanese:'食べる', furigana:'たべる', romaji:'taberu', english:'to eat', level:'N5', category:'Verbs', example:'ご飯を食べます。', exampleEn:'I eat rice.', mnemonic:'TABERU — "ta-bear-u" bear eats everything.' },
  { id:'v101', japanese:'飲む', furigana:'のむ', romaji:'nomu', english:'to drink', level:'N5', category:'Verbs', example:'水を飲みます。', exampleEn:'I drink water.', mnemonic:'NOMU — "no-moo" cow drinks no more.' },
  { id:'v102', japanese:'行く', furigana:'いく', romaji:'iku', english:'to go', level:'N5', category:'Verbs', example:'学校に行きます。', exampleEn:'I go to school.', mnemonic:'IKU — "icky!" going somewhere bad.' },
  { id:'v103', japanese:'来る', furigana:'くる', romaji:'kuru', english:'to come', level:'N5', category:'Verbs', example:'友達が来ます。', exampleEn:'A friend is coming.', mnemonic:'KURU — "koo-roo" curoo, someone\'s coming!' },
  { id:'v104', japanese:'見る', furigana:'みる', romaji:'miru', english:'to see / watch', level:'N5', category:'Verbs', example:'テレビを見ます。', exampleEn:'I watch TV.', mnemonic:'MIRU — "mirror" you see yourself.' },
  { id:'v105', japanese:'聞く', furigana:'きく', romaji:'kiku', english:'to listen / ask', level:'N5', category:'Verbs', example:'音楽を聞きます。', exampleEn:'I listen to music.', mnemonic:'KIKU — "kick-oo" kick to listen up.' },
  { id:'v106', japanese:'話す', furigana:'はなす', romaji:'hanasu', english:'to speak', level:'N5', category:'Verbs', example:'日本語を話します。', exampleEn:'I speak Japanese.', mnemonic:'HANASU — "ha-na-su" "ha! now Sue speaks!"' },
  { id:'v107', japanese:'書く', furigana:'かく', romaji:'kaku', english:'to write', level:'N5', category:'Verbs', example:'手紙を書きます。', exampleEn:'I write a letter.', mnemonic:'KAKU — "cac-oo" write a cactus shape.' },
  { id:'v108', japanese:'読む', furigana:'よむ', romaji:'yomu', english:'to read', level:'N5', category:'Verbs', example:'本を読みます。', exampleEn:'I read a book.', mnemonic:'YOMU — "yo moo" reading a cow story.' },
  { id:'v109', japanese:'買う', furigana:'かう', romaji:'kau', english:'to buy', level:'N5', category:'Verbs', example:'本を買います。', exampleEn:'I buy a book.', mnemonic:'KAU — "cow" buying milk.' },
  { id:'v110', japanese:'寝る', furigana:'ねる', romaji:'neru', english:'to sleep', level:'N5', category:'Verbs', example:'早く寝ます。', exampleEn:'I sleep early.', mnemonic:'NERU — "neroo" sleeping like Nero.' },
  { id:'v111', japanese:'起きる', furigana:'おきる', romaji:'okiru', english:'to wake up', level:'N5', category:'Verbs', example:'七時に起きます。', exampleEn:'I wake up at seven.', mnemonic:'OKIRU — "oh-key-roo" okay! waking up!' },
  { id:'v112', japanese:'分かる', furigana:'わかる', romaji:'wakaru', english:'to understand', level:'N5', category:'Verbs', example:'日本語が分かります。', exampleEn:'I understand Japanese.', mnemonic:'WAKARU — "wack-a-roo" wack! I understand now.' },

  // ── N5 Animals ──
  { id:'v120', japanese:'犬', furigana:'いぬ', romaji:'inu', english:'dog', level:'N5', category:'Animals', example:'犬が好きです。', exampleEn:'I like dogs.', mnemonic:'INU — "in-oo" dog indoors.' },
  { id:'v121', japanese:'猫', furigana:'ねこ', romaji:'neko', english:'cat', level:'N5', category:'Animals', example:'猫はかわいいです。', exampleEn:'Cats are cute.', mnemonic:'NEKO — "neck-o" cat nuzzles your neck.' },
  { id:'v122', japanese:'鳥', furigana:'とり', romaji:'tori', english:'bird', level:'N5', category:'Animals', example:'鳥が飛んでいます。', exampleEn:'The bird is flying.', mnemonic:'TORI — "Tory" like a bird.' },
  { id:'v123', japanese:'魚', furigana:'さかな', romaji:'sakana', english:'fish', level:'N5', category:'Animals', example:'魚が泳いでいます。', exampleEn:'The fish is swimming.', mnemonic:'SAKANA — "sack-ana" fish in a sack.' },

  // ── N5 Body ──
  { id:'v130', japanese:'頭', furigana:'あたま', romaji:'atama', english:'head', level:'N5', category:'Body', example:'頭が痛いです。', exampleEn:'My head hurts.', mnemonic:'ATAMA — "a-ta-ma" tap head, atama!' },
  { id:'v131', japanese:'目', furigana:'め', romaji:'me', english:'eye', level:'N5', category:'Body', example:'目が大きいです。', exampleEn:'(They) have big eyes.', mnemonic:'ME — "me" stare at myself.' },
  { id:'v132', japanese:'耳', furigana:'みみ', romaji:'mimi', english:'ear', level:'N5', category:'Body', example:'耳が聞こえます。', exampleEn:'I can hear with my ears.', mnemonic:'MIMI — "me-me" hear myself.' },
  { id:'v133', japanese:'手', furigana:'て', romaji:'te', english:'hand', level:'N5', category:'Body', example:'手を洗います。', exampleEn:'I wash my hands.', mnemonic:'TE — "te" touch = hand.' },
  { id:'v134', japanese:'足', furigana:'あし', romaji:'ashi', english:'foot / leg', level:'N5', category:'Body', example:'足が痛いです。', exampleEn:'My foot hurts.', mnemonic:'ASHI — "ah-she" she hurt her foot.' },

  // ── N4 Advanced Verbs ──
  { id:'v200', japanese:'覚える', furigana:'おぼえる', romaji:'oboeru', english:'to remember / memorize', level:'N4', category:'Verbs N4', example:'単語を覚えます。', exampleEn:'I memorize vocabulary.', mnemonic:'OBOERU — "oh-bo-air-u" air helps you remember.' },
  { id:'v201', japanese:'忘れる', furigana:'わすれる', romaji:'wasureru', english:'to forget', level:'N4', category:'Verbs N4', example:'名前を忘れました。', exampleEn:'I forgot the name.', mnemonic:'WASURERU — "was-ur-eh-roo" was that her? I forget.' },
  { id:'v202', japanese:'教える', furigana:'おしえる', romaji:'oshieru', english:'to teach / tell', level:'N4', category:'Verbs N4', example:'英語を教えます。', exampleEn:'I teach English.', mnemonic:'OSHIERU — "oh-she-air-u" she aired knowledge.' },
  { id:'v203', japanese:'習う', furigana:'ならう', romaji:'narau', english:'to learn', level:'N4', category:'Verbs N4', example:'ピアノを習っています。', exampleEn:'I am learning piano.', mnemonic:'NARAU — "nah-roo" nah, I\'ll learn it.' },
  { id:'v204', japanese:'始まる', furigana:'はじまる', romaji:'hajimaru', english:'to begin (intrans.)', level:'N4', category:'Verbs N4', example:'授業が始まります。', exampleEn:'Class begins.', mnemonic:'HAJIMARU — "ha-ji-ma-roo" ha! It just started!' },
  { id:'v205', japanese:'終わる', furigana:'おわる', romaji:'owaru', english:'to end / finish', level:'N4', category:'Verbs N4', example:'仕事が終わりました。', exampleEn:'The work finished.', mnemonic:'OWARU — "oh-war-u" oh! The war ended.' },
  { id:'v206', japanese:'使う', furigana:'つかう', romaji:'tsukau', english:'to use', level:'N4', category:'Verbs N4', example:'パソコンを使います。', exampleEn:'I use a computer.', mnemonic:'TSUKAU — "ts-kow" a cow uses tools.' },
  { id:'v207', japanese:'作る', furigana:'つくる', romaji:'tsukuru', english:'to make / create', level:'N4', category:'Verbs N4', example:'ケーキを作ります。', exampleEn:'I make a cake.', mnemonic:'TSUKURU — "tsoo-koo-roo" cuckoo clock maker.' },
  { id:'v208', japanese:'持つ', furigana:'もつ', romaji:'motsu', english:'to hold / have', level:'N4', category:'Verbs N4', example:'傘を持っています。', exampleEn:'I have an umbrella.', mnemonic:'MOTSU — "mo-tsoo" more to hold.' },
  { id:'v209', japanese:'貸す', furigana:'かす', romaji:'kasu', english:'to lend', level:'N4', category:'Verbs N4', example:'本を貸してください。', exampleEn:'Please lend me the book.', mnemonic:'KASU — "ka-soo" cash lent to you.' },
  { id:'v210', japanese:'借りる', furigana:'かりる', romaji:'kariru', english:'to borrow', level:'N4', category:'Verbs N4', example:'傘を借りました。', exampleEn:'I borrowed an umbrella.', mnemonic:'KARIRU — "car-ee-roo" borrowed a car.' },
  { id:'v211', japanese:'決める', furigana:'きめる', romaji:'kimeru', english:'to decide', level:'N4', category:'Verbs N4', example:'計画を決めます。', exampleEn:'I decide a plan.', mnemonic:'KIMERU — "key-mare-u" key decision.' },
  { id:'v212', japanese:'考える', furigana:'かんがえる', romaji:'kangaeru', english:'to think / consider', level:'N4', category:'Verbs N4', example:'よく考えます。', exampleEn:'I think carefully.', mnemonic:'KANGAERU — "kan-guy-roo" kangaroo thinking.' },

  // ── N4 Adjectives ──
  { id:'v220', japanese:'便利', furigana:'べんり', romaji:'benri', english:'convenient', level:'N4', category:'Adjectives N4', example:'このアプリは便利です。', exampleEn:'This app is convenient.', mnemonic:'BENRI — "ben-ree" Ben\'s place is convenient.' },
  { id:'v221', japanese:'大切', furigana:'たいせつ', romaji:'taisetsu', english:'important / precious', level:'N4', category:'Adjectives N4', example:'大切な人です。', exampleEn:'A precious person.', mnemonic:'TAISETSU — "tie-set-su" tie it set = important.' },
  { id:'v222', japanese:'難しい', furigana:'むずかしい', romaji:'muzukashii', english:'difficult', level:'N4', category:'Adjectives N4', example:'日本語は難しいです。', exampleEn:'Japanese is difficult.', mnemonic:'MUZUKASHII — "moo-zoo-cash-ee" too much cash for difficult zoo.' },
  { id:'v223', japanese:'易しい', furigana:'やさしい', romaji:'yasashii', english:'easy / kind', level:'N4', category:'Adjectives N4', example:'易しい問題です。', exampleEn:'It is an easy problem.', mnemonic:'YASASHII — "ya-sash-ee" ya! easy sash.' },
  { id:'v224', japanese:'正しい', furigana:'ただしい', romaji:'tadashii', english:'correct / right', level:'N4', category:'Adjectives N4', example:'正しい答えです。', exampleEn:'It is the correct answer.', mnemonic:'TADASHII — "ta-da-she" ta-da! She\'s right!' },
  { id:'v225', japanese:'面白い', furigana:'おもしろい', romaji:'omoshiroi', english:'interesting / funny', level:'N4', category:'Adjectives N4', example:'面白い映画です。', exampleEn:'It is an interesting movie.', mnemonic:'OMOSHIROI — "oh-mo-she-roi" oh! This movie is wow.' },
  { id:'v226', japanese:'親切', furigana:'しんせつ', romaji:'shinsetsu', english:'kind / friendly', level:'N4', category:'Adjectives N4', example:'親切な人です。', exampleEn:'(They) are a kind person.', mnemonic:'SHINSETSU — "shin-set-su" shin set kindly.' },
  { id:'v227', japanese:'丁寧', furigana:'ていねい', romaji:'teinei', english:'polite / careful', level:'N4', category:'Adjectives N4', example:'丁寧な説明です。', exampleEn:'It is a polite explanation.', mnemonic:'TEINEI — "tay-nay" tidy and neat = polite.' },

  // ── N4 Society ──
  { id:'v230', japanese:'社会', furigana:'しゃかい', romaji:'shakai', english:'society', level:'N4', category:'Society', example:'現代社会は複雑です。', exampleEn:'Modern society is complex.', mnemonic:'SHAKAI — "shah-kai" social gathering.' },
  { id:'v231', japanese:'政治', furigana:'せいじ', romaji:'seiji', english:'politics', level:'N4', category:'Society', example:'政治に興味があります。', exampleEn:'I am interested in politics.', mnemonic:'SEIJI — "say-gee" say gee about politics.' },
  { id:'v232', japanese:'経済', furigana:'けいざい', romaji:'keizai', english:'economy', level:'N4', category:'Society', example:'経済が成長しています。', exampleEn:'The economy is growing.', mnemonic:'KEIZAI — "kay-zai" ka-ching economy.' },
  { id:'v233', japanese:'文化', furigana:'ぶんか', romaji:'bunka', english:'culture', level:'N4', category:'Society', example:'日本の文化は豊かです。', exampleEn:'Japanese culture is rich.', mnemonic:'BUNKA — "bun-ka" culture like a bun.' },

  // ── N4 Travel ──
  { id:'v240', japanese:'旅行', furigana:'りょこう', romaji:'ryokou', english:'travel / trip', level:'N4', category:'Travel', example:'旅行が好きです。', exampleEn:'I like travelling.', mnemonic:'RYOKOU — "ryo-ko" Rio go! Travel!' },
  { id:'v241', japanese:'空港', furigana:'くうこう', romaji:'kuukou', english:'airport', level:'N4', category:'Travel', example:'空港に行きます。', exampleEn:'I go to the airport.', mnemonic:'KUUKOU — "coo-ko" cool air at airport.' },
  { id:'v242', japanese:'飛行機', furigana:'ひこうき', romaji:'hikouki', english:'airplane', level:'N4', category:'Travel', example:'飛行機に乗ります。', exampleEn:'I ride an airplane.', mnemonic:'HIKOUKI — "he-ko-key" fly high key.' },
  { id:'v243', japanese:'電車', furigana:'でんしゃ', romaji:'densha', english:'train / electric car', level:'N4', category:'Travel', example:'電車で通勤します。', exampleEn:'I commute by train.', mnemonic:'DENSHA — "den-sha" den of electric cars.' },
  { id:'v244', japanese:'バス', furigana:'バス', romaji:'basu', english:'bus', level:'N4', category:'Travel', example:'バスで行きます。', exampleEn:'I go by bus.', mnemonic:'BASU — "bass-u" bass beat on the bus.' },
  { id:'v245', japanese:'ホテル', furigana:'ホテル', romaji:'hoteru', english:'hotel', level:'N4', category:'Travel', example:'ホテルを予約しました。', exampleEn:'I made a hotel reservation.', mnemonic:'HOTERU — "hotel" in katakana.' },
  { id:'v246', japanese:'地図', furigana:'ちず', romaji:'chizu', english:'map', level:'N4', category:'Travel', example:'地図を見ます。', exampleEn:'I look at a map.', mnemonic:'CHIZU — "cheese-u" finding cheese on a map.' },

  // ── N4 Work ──
  { id:'v250', japanese:'仕事', furigana:'しごと', romaji:'shigoto', english:'work / job', level:'N4', category:'Work', example:'仕事が忙しいです。', exampleEn:'Work is busy.', mnemonic:'SHIGOTO — "she-go-to" she goes to work.' },
  { id:'v251', japanese:'会社', furigana:'かいしゃ', romaji:'kaisha', english:'company', level:'N4', category:'Work', example:'会社で働いています。', exampleEn:'I work at a company.', mnemonic:'KAISHA — "kai-sha" a company of fish.' },
  { id:'v252', japanese:'会議', furigana:'かいぎ', romaji:'kaigi', english:'meeting', level:'N4', category:'Work', example:'会議があります。', exampleEn:'There is a meeting.', mnemonic:'KAIGI — "kai-gee" guys gather = meeting.' },
  { id:'v253', japanese:'締め切り', furigana:'しめきり', romaji:'shimekiri', english:'deadline', level:'N4', category:'Work', example:'締め切りを守ります。', exampleEn:'I keep the deadline.', mnemonic:'SHIMEKIRI — "she-me-ki-ri" she makes the cut.' },
  { id:'v254', japanese:'給料', furigana:'きゅうりょう', romaji:'kyuuryou', english:'salary', level:'N4', category:'Work', example:'給料が上がりました。', exampleEn:'My salary went up.', mnemonic:'KYUURYOU — "cue-ryo" cue the salary dance.' },
  { id:'v255', japanese:'部長', furigana:'ぶちょう', romaji:'buchou', english:'department chief / manager', level:'N4', category:'Work', example:'部長に報告します。', exampleEn:'I report to the manager.', mnemonic:'BUCHOU — "boo-cho" manager shouts boo.' },

  // ── N4 Health ──
  { id:'v260', japanese:'体', furigana:'からだ', romaji:'karada', english:'body', level:'N4', category:'Health', example:'体を大切にします。', exampleEn:'I take care of my body.', mnemonic:'KARADA — "ka-ra-da" body of karate.' },
  { id:'v261', japanese:'病気', furigana:'びょうき', romaji:'byouki', english:'illness / disease', level:'N4', category:'Health', example:'病気になりました。', exampleEn:'I got sick.', mnemonic:'BYOUKI — "be-yoki" yikes, sick.' },
  { id:'v262', japanese:'薬', furigana:'くすり', romaji:'kusuri', english:'medicine / drug', level:'N4', category:'Health', example:'薬を飲みます。', exampleEn:'I take medicine.', mnemonic:'KUSURI — "coo-soo-ree" curing sore with medicine.' },
  { id:'v263', japanese:'医者', furigana:'いしゃ', romaji:'isha', english:'doctor', level:'N4', category:'Health', example:'医者に行きます。', exampleEn:'I go to the doctor.', mnemonic:'ISHA — "ee-sha" she is a doctor.' },
  { id:'v264', japanese:'痛い', furigana:'いたい', romaji:'itai', english:'painful / it hurts', level:'N4', category:'Health', example:'頭が痛いです。', exampleEn:'My head hurts.', mnemonic:'ITAI — "ee-tai!" ouch, it hurts!' },
  { id:'v265', japanese:'疲れる', furigana:'つかれる', romaji:'tsukareru', english:'to get tired', level:'N4', category:'Health', example:'仕事で疲れました。', exampleEn:'I got tired from work.', mnemonic:'TSUKARERU — "ts-car-eh-roo" car tired me out.' },

  // ── N4 Nature ──
  { id:'v270', japanese:'花', furigana:'はな', romaji:'hana', english:'flower', level:'N4', category:'Nature', example:'桜の花が綺麗です。', exampleEn:'Cherry blossoms are beautiful.', mnemonic:'HANA — "ha-na" pretty nature sound.' },
  { id:'v271', japanese:'木', furigana:'き', romaji:'ki', english:'tree', level:'N4', category:'Nature', example:'木の下で休みます。', exampleEn:'I rest under the tree.', mnemonic:'KI — "key" tree is the key to nature.' },
  { id:'v272', japanese:'山', furigana:'やま', romaji:'yama', english:'mountain', level:'N4', category:'Nature', example:'山に登ります。', exampleEn:'I climb the mountain.', mnemonic:'YAMA — "ya-ma" yam grows on a mountain.' },
  { id:'v273', japanese:'川', furigana:'かわ', romaji:'kawa', english:'river', level:'N4', category:'Nature', example:'川で泳ぎます。', exampleEn:'I swim in the river.', mnemonic:'KAWA — "ka-wa" water flowing ka-wa.' },
  { id:'v274', japanese:'空', furigana:'そら', romaji:'sora', english:'sky', level:'N4', category:'Nature', example:'空が青いです。', exampleEn:'The sky is blue.', mnemonic:'SORA — "so-ra!" the sky calls out.' },
  { id:'v275', japanese:'海', furigana:'うみ', romaji:'umi', english:'sea / ocean', level:'N4', category:'Nature', example:'海で泳ぎます。', exampleEn:'I swim in the sea.', mnemonic:'UMI — "oo-me" umi waves hello.' },
  { id:'v276', japanese:'春', furigana:'はる', romaji:'haru', english:'spring', level:'N4', category:'Nature', example:'春は暖かいです。', exampleEn:'Spring is warm.', mnemonic:'HARU — "ha-roo" spring blooms hurrah.' },
  { id:'v277', japanese:'夏', furigana:'なつ', romaji:'natsu', english:'summer', level:'N4', category:'Nature', example:'夏は暑いです。', exampleEn:'Summer is hot.', mnemonic:'NATSU — "nat-su" gnats in summer.' },
  { id:'v278', japanese:'秋', furigana:'あき', romaji:'aki', english:'autumn / fall', level:'N4', category:'Nature', example:'秋は涼しいです。', exampleEn:'Autumn is cool.', mnemonic:'AKI — "ah-key" ah, key season for colors.' },
  { id:'v279', japanese:'冬', furigana:'ふゆ', romaji:'fuyu', english:'winter', level:'N4', category:'Nature', example:'冬は寒いです。', exampleEn:'Winter is cold.', mnemonic:'FUYU — "foo-yoo" few you in winter cold.' },

  // ── N4 Adverbs ──
  { id:'v280', japanese:'もう', furigana:'もう', romaji:'mou', english:'already / anymore', level:'N4', category:'Adverbs', example:'もう終わりました。', exampleEn:'It is already finished.', mnemonic:'MOU — "moo" the cow already left.' },
  { id:'v281', japanese:'まだ', furigana:'まだ', romaji:'mada', english:'still / not yet', level:'N4', category:'Adverbs', example:'まだ起きています。', exampleEn:'I am still awake.', mnemonic:'MADA — "ma-da" mama\'s not done yet.' },
  { id:'v282', japanese:'もっと', furigana:'もっと', romaji:'motto', english:'more', level:'N4', category:'Adverbs', example:'もっと練習します。', exampleEn:'I will practice more.', mnemonic:'MOTTO — "motto" your motto is MORE.' },
  { id:'v283', japanese:'やっと', furigana:'やっと', romaji:'yatto', english:'finally / at last', level:'N4', category:'Adverbs', example:'やっと終わりました！', exampleEn:'It finally finished!', mnemonic:'YATTO — "yat-to" yay! at-to last!' },
  { id:'v284', japanese:'ずっと', furigana:'ずっと', romaji:'zutto', english:'all along / the whole time', level:'N4', category:'Adverbs', example:'ずっと待っていました。', exampleEn:'I was waiting the whole time.', mnemonic:'ZUTTO — "zoo-to" at the zoo all day long.' },
  { id:'v285', japanese:'だいたい', furigana:'だいたい', romaji:'daitai', english:'approximately / generally', level:'N4', category:'Adverbs', example:'だいたい三時間かかります。', exampleEn:'It takes approximately 3 hours.', mnemonic:'DAITAI — "die-tie" generally a tied result.' },
  { id:'v286', japanese:'たぶん', furigana:'たぶん', romaji:'tabun', english:'probably / perhaps', level:'N4', category:'Adverbs', example:'たぶん雨が降ります。', exampleEn:'It will probably rain.', mnemonic:'TABUN — "ta-bun" tabu(n) on guessing.' },
  { id:'v287', japanese:'必ず', furigana:'かならず', romaji:'kanarazu', english:'surely / without fail', level:'N4', category:'Adverbs', example:'必ず来てください。', exampleEn:'Please come without fail.', mnemonic:'KANARAZU — "ka-na-ra-zoo" kangaroo always comes.' },
]

export const vocabDataFull = vocabData
