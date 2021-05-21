// -------------------------------- //
// クイズの問題＋選択肢＋答えを定義
// -------------------------------- //
const quiz = [
  {
    question: 'ゲーム市場、もっとも売れたゲーム機は次のうちどれ？',
    answers: [
      'スーパーファミコン',
      'プレイステーション2',
      'ニンテンドースイッチ',
      'ニンテンドーDS'
    ],
    correct: 'ニンテンドーDS'
  }, {
    question: '糸井重里が企画に関わった、任天堂の看板ゲームといえば？',
    answers: [
      'MOTHER2',
      'スーパーマリオブラザーズ3',
      'スーパードンキーコング',
      '星のカービィ'
    ],
    correct: 'MOTHER2'
  }, {
    question: 'ファイナルファンタジー5の主人公の名前は？',
    answers: [
      'フリオニール',
      'セシル',
      'バッツ',
      'クラウド'
    ],
    correct: 'バッツ'
  }
];

const quizLength = quiz.length;
let quizIndex = 0;
// 正解数
let score = 0;

const $button = document.getElementsByTagName('button');
const buttonLength = $button.length;


// -------------------------------- //
// 問題文＋ボタンを表示
// -------------------------------- //
// むき出しの状態にしておくのではなく、関数化してしまう
// 上で用意した問題文・ボタンの表示をまとめて定数化
const setupQuiz = () => {
  document.getElementById('js-question').textContent = quiz[quizIndex].question;
  let buttonIndex = 0;
  while ( buttonIndex < buttonLength) {
    $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
    buttonIndex++;
  }
}
setupQuiz();
// こうやって一定のまとまりごとに関数を指定すると見やすい


// -------------------------------- //
// ボタンをクリックしたら正誤判定を行う
// -------------------------------- //
const clickHandler = (e) => {
  if (quiz[quizIndex].correct === e.target.textContent) {
    window.alert('正解！');
    score++;
  } else {
    window.alert('不正解！');
  }

  // 次の問題に行く＋最後の問題が終わったら終了
  quizIndex++;
  if (quizIndex < quizLength) {
    setupQuiz();
  } else {
    window.alert('クイズ終了！　あなたは' + quizLength + '問中、' + score + '問正解しました！');
    quizIndex = 0;
    setupQuiz();
  }
};

// 実際に押したときの処理
let handlerIndex = 0;
while (handlerIndex < buttonLength) {
  $button[handlerIndex].addEventListener('click', (e) => {
    clickHandler(e);
  });
  handlerIndex++;
};