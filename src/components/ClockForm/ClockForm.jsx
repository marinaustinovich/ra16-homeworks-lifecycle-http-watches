import React, { Component } from 'react';

export default class ClockForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        name: '',
        timezone: '',
        };
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    };

    handleTimezoneChange = (e) => {
        this.setState({ timezone: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, timezone } = this.state;
        const newClock = {
            name,
            timezone,
            offset: parseInt(timezone, 10), // в production используется введении города в поле временной зоны автоматически устанавливалось значение, например, через Google Time Zone API:
        };
        this.props.onAddClock(newClock);
        this.setState({ name: '', timezone: '' });
    };

    render() {
        const { name, timezone } = this.state;
        return (
        <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
            <label htmlFor="name" className="form-label">
                Название:
            </label>
            <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={this.handleNameChange}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="timezone" className="form-label">
                Временная зона:
            </label>
            <input
                type="text"
                className="form-control"
                id="timezone"
                value={timezone}
                onChange={this.handleTimezoneChange}
            />
            </div>
            <button type="submit" className="btn btn-primary">
            Добавить
            </button>
        </form>
        );
    }
}
