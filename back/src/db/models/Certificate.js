import { CertificateModel } from "../schemas/certificate.js";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByTitle({ title }) {
    const certificate = await CertificateModel
      .findOne({ title }, { _id: false, __v: false })
      .populate('user', 'id -_id');
    return certificate;
  }

  static async findById({ id }) {
    const certificate = await CertificateModel
      .findOne({ id }, { _id: false, __v: false })
      .populate('user', 'id -_id');
    return certificate;
  }

  static async findByUser({ user }) {
    const certificates = await CertificateModel
      .find({ user }, { _id: false, __v: false })
      .populate('user', 'id -_id');
    return certificates;
  }

  static async find(filter) {
    const certificates = await CertificateModel
      .find(filter, { _id: false, __v: false })
      .populate('user', 'id -_id');
    return certificates;
  }

  static async update({ id, fieldToUpdate }) {
    const filter = { id: id };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      { "$set": fieldToUpdate },
      option
    );
    return updatedCertificate;
  }

  static async delete({ id }) {
    await CertificateModel.deleteOne({ id });
  }
}

export { Certificate };
