// trade off between query performance vs consistency

// using references (Normalization)
let author = {
  name: "Manish Rawal",
};

let course = {
  author: "id",
};

//using embedded documents(denormalization)

let course = {
  author: {
    name: "Manish Rawal",
  },
};

//hybrid approach

let author = {
  name: "Manish",
  //50 other properties
};

let course = {
  author: {
    id: "ref",
    name: "Manish",
  },
};


