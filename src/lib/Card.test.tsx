import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

test('renders folk holidays as expected', () => {
    const events = [
        {
            type: "folk",
            name: "Mihklipäev"
        }
    ];
    const { container, getByText } = render(<Card date={'Jul 2'} dateUnformatted={'2020-07-02'} day={'Tuesday'} events={events} />);
    const dayOfWeek = getByText(/Tuesday/i);
    const date = getByText(/Jul 2/i);
    const holidayName = getByText(/Mihklipäev/i);

    expect(holidayName).toBeInTheDocument();
    expect(dayOfWeek).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(container.firstChild.classList.contains('card--folk')).toBe(true);
    expect(container.firstChild.classList.contains('card--public')).toBe(false);
});

test('renders public holidays as expected', () => {
    const events = [
        {
            type: "public",
            name: "Jaanipäev"
        }
    ];
    const { container, getByText } = render(<Card date={'Jun 24'} dateUnformatted={'2020-06-24'} day={'Thursday'} events={events} />);
    const dayOfWeek = getByText(/Thursday/i);
    const date = getByText(/Jun 24/i);
    const holidayName = getByText(/Jaanipäev/i);

    expect(holidayName).toBeInTheDocument();
    expect(dayOfWeek).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(container.firstChild.classList.contains('card--folk')).toBe(false);
    expect(container.firstChild.classList.contains('card--public')).toBe(true);

});

test('renders multi-holidays as expected', () => {
    const events = [
        {
            type: "public",
            name: "Jaanipäev"
        },
        {
            type: "folk",
            name: "Mihklipäev"
        }
    ];

    const { container, getByText } = render(<Card date={'Jun 24'} dateUnformatted={'2020-06-24'} day={'Thursday'} events={events} />);
    const dayOfWeek = getByText(/Thursday/i);
    const date = getByText(/Jun 24/i);
    const holidayName1 = getByText(/Jaanipäev/i);
    const holidayName2 = getByText(/Mihklipäev/i);

    expect(holidayName1).toBeInTheDocument();
    expect(holidayName2).toBeInTheDocument();
    expect(dayOfWeek).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(container.firstChild.classList.contains('card--folk')).toBe(false);
    expect(container.firstChild.classList.contains('card--public')).toBe(true);

});


