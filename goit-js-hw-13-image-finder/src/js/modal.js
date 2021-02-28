import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onOpenModal(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  evt.preventDefault(); //отмена перехода по ссылке
  const imageToShow = `<img src= ${evt.target.dataset.source}>`;
  console.log(imageToShow);
  const instance = basicLightbox.create(imageToShow);
  instance.show();
}

export { onOpenModal };
