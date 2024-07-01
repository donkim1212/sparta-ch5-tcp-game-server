export const handleError = (socket, error) => {
  try {
    if (error.code) {
      console.error(`Code: ${error.code}, Message: ${error.message}`);
    } else {
      console.error(error);
    }

    // send response packet here
    // socket.write();
  } catch (err) {
    console.error(err);
  }
};
