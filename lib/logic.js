
async function TransferAStudent(transferStudent) {
    transferStudent.student.school = transferStudent.newSchool;
    let assetRegistry = await getAssetRegistry('org.crypto.mynetwork.Commodity');
    await assetRegistry.update(transferStudent.student);
}