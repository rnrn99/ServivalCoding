import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findById({ id }) {
    const certificate = await CertificateModel.findOne({ id });
    return certificate;
  }

  static async findByTitle({ title }) {
    const certificate = await CertificateModel.findOne({ title });
    return certificate;
  }

  static async findByUserId({ user_id }) {
    const certificate = await CertificateModel.findOne({ user_id });
    return certificate;
  }

  static async findAll() {
    const certificates = await CertificateModel.find({});
    return certificates;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async delete({ id }) {
    await CertificateModel.deleteOne({ id });
  }
}

export { Certificate };
