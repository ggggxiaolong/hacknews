import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {Table} from './index'

describe('Table', () => {
    const list = [
        {title: '1', author: '1', num_comments: 1, points: 1, objectID: 'y'},
        {title: '2', author: '2', num_comments: 2, points: 2, objectID: 'z'},
    ]
    const onDismiss = () => {}
    const props = {list, onDismiss}
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Table {...props}/>, div)
    })
    test("has a valid snapshot", () => {
        const component = renderer.create(
            <Table {...props}>
                Dismiss
            </Table>
        )
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})