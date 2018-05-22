import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.crypto.mynetwork{
   export class Schools extends Participant {
      schoolId: string;
      schoolName: string;
   }
   export class Students extends Asset {
      assetId: string;
      school: Schools;
      StudentName: string;
      Grade: string;
      GPA: number;
   }
   export class TransferStudent extends Transaction {
      student: Students;
      newSchool: Schools;
   }
// }
