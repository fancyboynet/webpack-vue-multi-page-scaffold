/**
 * Created by Lenovo on 2017/12/16.
 */
export default async function (imageFile) {
  let promise;
  if (window.FileReader) {
    let fr = new FileReader();
    promise = new Promise((s, j) => {
      fr.onload = e => {
        let data = e.target.result;
        //加载图片获取图片真实宽度和高度
        let image = new Image();
        image.onload = function () {
          let width = image.width;
          let height = image.height;
          s({
            width,
            height,
            size: imageFile.size
          });
        };
        image.onerror = _ => s(null);
        image.src = data;
      }
      fr.onerror = _ => s(null);;
    })
    fr.readAsDataURL(imageFile);
  } else {
    promise = Promise.resolve(null);
  }
  return promise;
}