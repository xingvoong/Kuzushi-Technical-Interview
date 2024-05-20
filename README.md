
# Submission for Kuzushi-Technical-Interview

## Explanation:
- The code in nurseAssignment.ts explains itself.
- Add preprocessData to preprocess the data
- Calculate Distance: Added a function calculateDistance to compute the distance between the nurse's location and the facility location.
- Score Calculation: Updated the scoreNurses function to include the weights for each category.
- Distance Normalization: Assume a maximum distance of 100 km for normalization purposes.
- Main Function: Modified to include a sample facility location. This can be replaced with the actual location input.

## Running the Code
1: Install dependencies

```
npm install simple-statistics @types/node
```

2: Compile TypeScript:

```
tsc nurseAssignment.ts
```

3: Run the Compiled JavaScript:

```
node nurseAssignment.js
```

## Expectation of a result run
```
Xings-MacBook-Pro:for-applicants xingvoong$ node nurseAssignment.js
[
  {
    id: '054890e1-406d-454c-b177-6ded8486b11c',
    name: 'Phyllis Kris',
    location: { latitude: '-28.4473', longitude: '146.6123' },
    yoe: 7,
    acceptedOffers: 11,
    canceledOffers: 51,
    averageReplyTime: 2783
  },
  {
    id: '03661840-74a2-4687-a3ec-2d21dfc9eafc',
    name: 'Gayle Dooley DDS',
    location: { latitude: '24.6332', longitude: '-4.6298' },
    yoe: 16,
    acceptedOffers: 44,
    canceledOffers: 18,
    averageReplyTime: 1666
  },
  {
    id: '92cf57d1-2e47-4722-bd54-0b54afe6d1d7',
    name: 'Dolores Mills',
    location: { latitude: '7.7747', longitude: '-56.1791' },
    yoe: 4,
    acceptedOffers: 64,
    canceledOffers: 18,
    averageReplyTime: 'null'
  },
  {
    id: '76157514-d272-42ae-a7be-3780f9e52fbe',
    name: 'Mrs. Arnold Conroy',
    location: { latitude: '-31.0886', longitude: '62.6549' },
    yoe: 'eleven',
    acceptedOffers: 70,
    canceledOffers: 14,
    averageReplyTime: 'null'
  },
  {
    id: 'ee4fca33-d1e3-4f80-ae86-13a76096f81f',
    name: 'Holly MacGyver',
    location: { latitude: '-57.5551', longitude: '118.6382' },
    yoe: 22,
    acceptedOffers: 51,
    canceledOffers: 63,
    averageReplyTime: 1069
  },
  {
    id: '38702a7b-c3aa-4757-aa2c-e5c482c82a7b',
    name: 'Erik Crist',
    location: { latitude: '-36.4212', longitude: '-10.5290' },
    yoe: 25,
    acceptedOffers: 69,
    canceledOffers: 21,
    averageReplyTime: 2772
  },
  {
    id: '1af53008-ff9b-4b8a-942d-58132f3f4aff',
    name: 'Scott Dare',
    location: { latitude: '50.5615', longitude: '63.5686' },
    yoe: 9,
    acceptedOffers: 56,
    canceledOffers: 30,
    averageReplyTime: 807
  },
  {
    id: 'ba872eaf-b1bb-41db-bf2b-5057aeed8abf',
    name: 'Leroy Emard',
    location: { latitude: '-18.2142', longitude: '-142.5755' },
    yoe: 13,
    acceptedOffers: 38,
    canceledOffers: 65,
    averageReplyTime: 210
  },
  {
    id: '03b7165d-5fa0-44f2-a146-6f808170fb92',
    name: 'Elsa Kerluke',
    location: { latitude: '-15.6876', longitude: '-165.1514' },
    yoe: 15,
    acceptedOffers: 'null',
    canceledOffers: 38,
    averageReplyTime: 1409
  },
  {
    id: '8fc83e34-b081-4bfd-b925-c505e139085a',
    name: 'Ms. Nelson Kulas',
    location: { latitude: '-87.9584', longitude: '3.0949' },
    yoe: 5,
    acceptedOffers: 44,
    canceledOffers: 'null',
    averageReplyTime: 2514
  }
]

```