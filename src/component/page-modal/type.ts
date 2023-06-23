export interface IProps {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formList: any[]
}

export interface IModalProps {
  modalConfig: IProps
}
