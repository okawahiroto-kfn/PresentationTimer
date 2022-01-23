let check = document.getElementById('btnSum');
let table = document.getElementById('table');
let total = document.getElementById('total');
let btnDelete = document.getElementById('btnDelete');

let sumCells = 0;

window.onload = function() {
  // alert('loaded');
  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {
  sumCells = sumCells + Number(table.rows[i].cells[1].innerText);
  total.innerText = sumCells;

  // trにidを付与
  let row = table.rows[i];
  row.setAttribute('id', i);
  console.log(row);

  // 削除ボタンにidを付与
  let dButton = table.rows[i].cells[2].children[0];
  dButton.setAttribute('id', i);
  };
};

// 合計ボタンが押された時の処理
btnSum.addEventListener('click', function() {
  console.log('合計ボタンが押されました');

  // tebleの要素を表示
  console.log(table);

  // tableの各行の要素を表示
  console.log(table.rows);

  // tableの行数を表示
  console.log(table.rows.length);

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {
    // 時間の合計を計算
    sumCells = sumCells + Number(table.rows[i].cells[1].innerText);

    // trにidを付与
    let row = table.rows[i];
    row.setAttribute('id', i);
    console.log(row);

    // 削除ボタンにidを付与
    let dButton = table.rows[i].cells[2].children[0];
    dButton.setAttribute('id', i);
    console.log(dButton);
  };

  console.log(sumCells);
  total.innerText = sumCells;
  sumCells = 0;
});

// 削除ボタンが押された時の処理
function clickDelete(ele) {
  console.log('deleteボタンが押されました');

  // 削除ボタンのidを取得
  let id_value = ele.id;
  console.log(id_value);

  // tableの各行の要素を取得
  let row = document.getElementsByTagName('tr')[id_value];
  console.log(document.getElementsByTagName('tr'));
  console.log(row);

  // ボタンの行の分数を取得
  console.log(row.cells[1].innerText);

  sumCells = sumCells - Number(row.cells[1].innerText);
  total.innerText = sumCells;

  row.remove();
  // ※この後、存在しない(画面に表示されない)tr行があり、行の削除がうまくできない。
  // 上の行から削除すると、最後、合計行が削除されてしまう。
  // 下の行から削除するとうまくいく。
};

