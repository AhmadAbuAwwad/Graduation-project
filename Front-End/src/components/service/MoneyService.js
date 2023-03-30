export class MoneyService {
  getMoneysSmall() {
    return fetch("data/money-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getMoneys() {
    return fetch("http://localhost:8080/api/moneyDonating/getAllHistory")
      .then((res) => res.json());
  }

  getMoneysWithOrdersSmall() {
    return fetch("data/money-orders-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
