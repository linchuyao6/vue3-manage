const searchConfig = {
  pageName: 'role',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入查询的角色',
      initiaValue: 'aaa'
    },
    {
      type: 'input',
      prop: 'intro',
      label: '权限介绍',
      placeholder: '请输入查询的权限'
    },
    {
      type: 'data-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}
export default searchConfig