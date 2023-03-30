
export class UserDrugService {

    getUserDrugs() {
        return fetch('data/userDrug-small.json').then(res => res.json()).then(d => d.data);
    }

    getUserDrugs() {
        return fetch(
            "http://localhost:8080/api/userDrug/getAllReceivedMedicines"
          ).then((res) => res.json());
    }

    getUserDrugsWithOrdersSmall() {
        return fetch('data/userDrug-orders-small.json').then(res => res.json()).then(d => d.data);
    }
}
    