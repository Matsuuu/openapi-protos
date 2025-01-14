import { html, render } from "lit";
import "./style.css";
import { client, createFruit, Fruit, getFruits } from "./api";

const FRUIT_COLL: Fruit[] = [
    {
        name: "Apple",
        description:
            "A round fruit with red or green skin and a crisp, juicy flesh. Often eaten raw, cooked, or used in various desserts and dishes.",
    },
    {
        name: "Banana",
        description:
            "A long curved fruit with a yellow skin that is easy to peel. It has a soft, sweet flesh and is a popular snack food.",
    },
    {
        name: "Orange",
        description:
            "A spherical fruit with a tough orange skin and juicy, segmented flesh inside. Known for its tangy flavor and high vitamin C content.",
    },
    {
        name: "Grapes",
        description:
            "Small, round fruits that grow in clusters. Grapes can be green, red, or purple, and are often used to make wine or eaten fresh.",
    },
    {
        name: "Strawberry",
        description:
            "A small, juicy red fruit with tiny seeds on its outer surface. Strawberries are often eaten fresh, in desserts, or used in jams and preserves.",
    },
    {
        name: "Watermelon",
        description:
            "A large, round fruit with a thick green rind and juicy, sweet red flesh with black seeds. Often eaten chilled as a refreshing snack.",
    },
    {
        name: "Pineapple",
        description:
            "A tropical fruit with a rough, spiky skin and sweet, juicy yellow flesh. Pineapples are often eaten fresh or used in juices and desserts.",
    },
];

client.setConfig({
    baseUrl: "http://localhost:8080",
});

async function addFruit(fruit: Fruit) {
    const res = await createFruit({ body: fruit });
    if (!res.error) {
        console.log(res);
    }
    update();
}

async function update() {
    const fruits = await getFruits()
        .then(res => res.data)
        .then(res => res?.fruits);

    render(
        html`
            <h2>Add fruits to the collection</h2>

            <ul>
                ${fruits?.map(fruit => html`<li>${fruit.name} (${fruit.description})</li>`)}
            </ul>

            <ul>
                ${FRUIT_COLL.map(
                    fruit => html` <li><button @click=${() => addFruit(fruit)}>Add ${fruit.name}</button></li> `,
                )}
            </ul>
        `,
        document.body,
    );
}

update();
