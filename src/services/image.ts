// "https://res.cloudinary.com/demo/image/upload/c_crop,h_200,w_300,x_255,y_410/brown_sheep.jpg";
const imagesRoot = "https://res.cloudinary.com/demo/image/upload";

type GetImage = {
  path: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const getImage = ({ h, path, w, x, y }: GetImage) => {
  return `${imagesRoot}/c_crop,h_${h},w_${w},x_${x},y_${y}/${path}`;
};
