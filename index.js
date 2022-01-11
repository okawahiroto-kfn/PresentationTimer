let btn = document.getElementById('btn');
let inputText = document.getElementById('inputText');
let ulElement = document.getElementById('list');

let btnAddNode = document.getElementById('btnAddNode');
let divElement = document.getElementById('addNode');

let btnDelete = document.getElementById('btnDelete');
console.log(btnDelete);

const btnDeleteNode = document.getElementById('btnDeleteNode');

let btnCount = 0;

btn.addEventListener('click', function() {
  console.log('ボタンが押されました！');

  // ul要素の子要素に、li要素を追加する。
  let childNode = document.createElement('li');

  // li要素のテキストに、テキストボックスのテキストを入れる。
  childNode.textContent = inputText.value;
  // テキストボックスを空欄にする。
  inputText.value = '';
  // ul要素の子要素に、li要素を追加する。
  ulElement.appendChild(childNode);

  // li要素の数を数える。
  let childElementCount = ulElement.childElementCount;

  // for文を用いて、li要素のテキストをli要素の数だけ取得、表示する。
  for (let i = 0; i < childElementCount; i++) {
    console.log(ulElement.children[i].textContent);
  };

  // li要素の数を表示する。
  console.log(childElementCount);

});


// 配列を用いて、li要素の値を取得、表示する。
// console.log(ulElement.children[2].textContent);

btnAddNode.addEventListener('click', function() {
  // AddNodeボタンを押した回数カウント
  btnCount = btnCount + 1;
  console.log('ボタンが押されました' + btnCount + '回目');

  // templeteの内容を取得し、有効にする。
  var templete = document.getElementById('templete');
  var content = templete.content;
  var clone = document.importNode(content, true);

  // ナンバリング(ボタンを押した回数をもとに、ナンバリングする)
  clone.getElementById('itemNumber').innerText = btnCount + '.';

  // 各行ごとのid名付与(後で、削除できるようにするため)
  const divNo = clone.querySelector('div');
  divNo.setAttribute('id', btnCount);

  // 削除ボタンにもid名付与(後で、削除できるようにするためだが、これではダメかも)
  var btnDelete = clone.getElementById('btnDelete');
  // deleteNo.setAttribute('id', 'btnDelete' + btnCount);

  // div要素の子要素に、templete(の内容)を追加する。
  document.getElementById('addNode').appendChild(clone);

  // divの子要素の数カウント(テキストボックス他のカウント)
  let childElementCount = divElement.childElementCount;
  console.log('子要素の数:' + childElementCount);

  // addNodeの子要素を取得(テキストボックス他のカウント)
  let childNode = document.getElementById('addNode').children;
  console.log(childNode);

  // 1行目の削除ボタンの要素を取得
  console.log(childNode[0].children[4]);

  console.log(btnDelete);
});

btnDeleteNode.addEventListener('click', function() {
  console.log('削除ボタンが押されました');

  // 削除ボタンを押した回数に応じて、削除する要素を指定する。
  const target = document.getElementById(btnCount);
  target.parentNode.removeChild(target);

  btnCount = btnCount - 1;

});


// 20220111ここから
// 各行の削除ボタンが有効かどうか確認する。
if (btnDelete != null) {
  btnDelete.addEventListener('click', function() {
  console.log('削除ボタンが押されました');
  });
} else {
  console.log('btnDeleteがnullです');
};

// tableの要素取得
var tableElement = document.getElementById('table');

// tableの行の要素取得
var rowsElement = tableElement.rows;

// 行数(タイトル・合計含む)
console.log(rowsElement.length);

// 参考：2行目の2列目(「導入」行の「分」列)の値
console.log(rowsElement[1].cells[1].textContent);

// 分の合計を計算
var sumMin = 0;
for (let i = 1; i < (rowsElement.length - 1); i++) {
  var minValue = Number(rowsElement[i].cells[1].textContent);
  var sumMin = sumMin + minValue;
};

// 合計をtebleの合計行に表示
rowsElement[5].cells[1].textContent = sumMin;
// 20220111ここまで


let btnAddNode02 = document.getElementById('btnAddNode02');

// templeteを使って、テキストを変更する。
btnAddNode02.addEventListener('click', function() {
  console.log('ボタンが押されました！');

  const templete02 = document.getElementById('templete02');
  const content02 = templete02.content;

  const clone02 = document.importNode(content02, true);

  let userName = 'Yamada';

  clone02.getElementById('name').innerText = userName;

  document.getElementById('addNode02').appendChild(clone02);

  console.log(clone02);
});
