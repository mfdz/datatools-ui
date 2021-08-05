import React from 'react'
import { Modal } from 'react-bootstrap'

// @flow

import LabelEditor from '../components/LabelEditor'
import type { Label } from '../../types'

type Props = {
  label?: Label,
  projectId?: String
}

type State = {
  showModal: boolean
}

/**
 * Renders a LabelEditor within a Modal, including a dynamic title depending
 * on if a label is new
 */
export default class LabelEditorModal extends React.Component<
  Props,
  State
> {
  state = {
    showModal: false
  };

  close = () => {
    this.setState({
      showModal: false
    })
  };

  // Used in the ref
  open = () => {
    this.setState({
      showModal: true
    })
  };

  // Used in the ref
  ok = () => {
    this.close()
  };

  render () {
    const { Body, Header, Title } = Modal
    const label = this.props.label || {}
    const { projectId } = this.props

    return (
      <Modal keyboard onHide={this.close} show={this.state.showModal}>
        <Header>
          <Title>{label.name ? 'Edit Label' : 'Create New Label'}</Title>
        </Header>

        <Body>
          <LabelEditor
            label={label}
            onDone={this.close}
            projectId={projectId}
          />
        </Body>
      </Modal>
    )
  }
}