let btn = document.getElementById('btn');
let inputText = document.getElementById('inputText');
let ulElement = document.getElementById('list');

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
console.log(ulElement.children[2].textContent);
