import React, {Component} from "react";

export class Test extends Component {

    selectHandler = (event) => {
        console.log(event);
        console.log(event.target.value);
        fetch(`https://internsapi.public.osora.ru/api/game/play`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                'type_hard': event.target.value,
                type: 1,
            })
        })
            .then(response => response.json())
            .then(data => {console.log('This is data', data)})
    }

    render() {
        return (
            <section>
                <select onChange={this.selectHandler} defaultValue={'Выберите сложность'}>
                    <option value="1">Easy/Легко</option>
                    <option value="2">Hard/Сложно</option>
                    <option disabled selected>Выберите сложность</option>
                </select>
            </section>
        )
    }
}
