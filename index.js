var btn = document.getElementById('btn');

btn.addEventListener('click', function() {
  console.log('ボタンが押されました！');

  var text = document.getElementById('text');
  text.innerText = 'Hello World!';

  let parentNode = document.getElementById('text');
  let childNode = document.createElement('div');
  childNode.appendChild(document.createTextNode('追加！'));
  parentNode.appendChild(childNode);
});
