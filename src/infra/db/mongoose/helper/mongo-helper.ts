import mongoose from 'mongoose';

export const MongoHelper = {
  async connect(uri: string): Promise<void> {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  },

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  },

  serialize(data: any): any {
    if (!data) {
      return data;
    }
    const { _id, __v, ...dataWithoutIdAndVersion } = data;
    return Object.assign({}, dataWithoutIdAndVersion, { id: _id });
  },
};
