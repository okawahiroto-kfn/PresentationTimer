let btn = document.getElementById('btn');
let inputText = document.getElementById('inputText');
let ulElement = document.getElementById('list');

let btnAddNode = document.getElementById('btnAddNode')
let divElement = document.getElementById('addNode')

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

  // templateの内容を取得し、有効にする。
  var template = document.getElementById('template');
  var content = template.content;
  var clone = document.importNode(content, true);

  // ナンバリング(ボタンを押した回数をもとに、ナンバリングする)
  clone.getElementById('itemNumber').innerText = btnCount + '.';

  // 各行ごとのid名付与(後で、削除できるようにするため)
  const divNo = clone.querySelector('div');
  divNo.setAttribute('id', btnCount);

  // 削除ボタンにもid名付与(後で、削除できるようにするためだが、これではダメかも)
  const deleteNo = clone.getElementById('btnDelete');
  deleteNo.setAttribute('id', 'btnDelete' + btnCount);

  // div要素の子要素に、template(の内容)を追加する。
  document.getElementById('addNode').appendChild(clone);

  // divの子要素の数カウント(テキストボックス他のカウント)
  let childElementCount = divElement.childElementCount;
  console.log('子要素の数:' + childElementCount);
});

const target = document.getElementById(btnCount);


let btnAddNode02 = document.getElementById('btnAddNode02');

// templateを使って、テキストを変更する。
btnAddNode02.addEventListener('click', function() {
  console.log('ボタンが押されました！');

  const template02 = document.getElementById('template02');
  const content02 = template02.content;

  const clone02 = document.importNode(content02, true);

  let userName = 'Yamada';

  clone02.getElementById('name').innerText = userName;

  document.getElementById('addNode02').appendChild(clone02);

  console.log(clone02);
});
