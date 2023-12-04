/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { computed, ref, watchEffect } from 'vue'
import {
  ElButton,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElLink,
  ElMessageBox,
} from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

import { assign, cloneDeep, isEmpty, merge } from 'lodash-unified'
// import XEUtils from 'xe-utils'
import { isFunction } from '@setaria-components/utils'
import { useLocale } from '@setaria-components/hooks'
import ScSchemaForm from '@setaria-components/components/schema-form'
import {
  callbackExec,
  getSchemaDefaultObject,
  looseEqual,
} from '../../common-schema/utils'
import type { Ref, Slots } from 'vue'
import type { SchemaFormInstance } from '@setaria-components/components/schema-form'
import type { VxeGridInstance } from 'vxe-table'

export declare interface EditableConfig {
  detailVisible: Ref<boolean>
  currentItem: any
  controlStatus: string
}

export const useEditable = (
  props: any,
  emit: Function,
  slots: Slots,
  xTable: Ref<VxeGridInstance | undefined>,
  selectionList: Ref<any[]>,
  innerDataList: Ref<any[]>
  // editConfig: EditableConfig
) =>
  //
  //   props: any,
  //   emit: Function,
  //   columnsBySchema: any[]
  {
    const { t } = useLocale()
    const formRef = ref<SchemaFormInstance>()
    const isSaveLoading = ref(false)
    const controlStatus = ref('')

    const detailVisible = ref<boolean>(false)

    const originFormData = ref({})
    const currentFormData = ref({})

    const MODIFY_BUTTON = {
      key: 'operation-update',
      label: t('sc.schemaTable.update'),
    }

    const VIEW_BUTTON = {
      key: 'operation-view',
      label: t('sc.schemaTable.view'),
    }
    const DELETE_BUTTON = {
      key: 'operation-delete',
      label: t('sc.schemaTable.delete'),
    }

    const EDIT_TYPE = {
      ADD: 'add',
      DELETE: 'delete',
      UPDATE: 'update',
      VIEW: 'view',
    }

    const PRIMARY_ROW_KEY = '_X_ROW_KEY'

    const innerRowKey = computed(() => {
      return props.rowKey || PRIMARY_ROW_KEY
    })
    // const detaildetailVisible = ref<boolean>(false)
    //   const isAllChecked = ref<boolean>(false)
    //   let checkedKeys = reactive<Array<any>>([])
    //   const columnsBySchemaSorted = ref<any[]>([]) //reactive<Array<any>>([])
    //   const treeRef = ref<InstanceType<typeof ElTree>>()

    // onDialogSaveButtonClick() {
    //   const {
    //     controlStatus,
    //     data,
    //     dataAddPosition,
    //     currentFormData,
    //     originFormData,
    //     save
    //     // selectRow
    //   } = this;

    // },
    // 初始化当前编辑状态下的数据
    const initialRowData = (currentRow: any, appendInfo?: any) => {
      originFormData.value = currentRow
      currentFormData.value = cloneDeep({
        ...{},
        ...currentRow,
        ...appendInfo,
      })
    }

    const callFormSave = (data: any, afterExec: Function) => {
      if (isFunction(props.formSave)) {
        // 传递编辑中数据以避免失败时需要进行回退
        const res = props.formSave(data, controlStatus.value, formRef)
        if (res.then) {
          res
            .then(() => {
              afterExec()
            })
            .finally(() => {
              // 关闭
              isSaveLoading.value = false
            })
        } else if (res) {
          afterExec()
        }
      } else {
        afterExec()
      }
    }

    // 关闭之前回调
    const handlerBeforeClose = (callback: Function) => {
      const message = t('sc.schemaTable.giveUpUpdate')
      const confirmButtonText = t('sc.common.yes')
      const cancelButtonText = t('sc.common.no')
      // this.$nextTick(() => {
      if (looseEqual(currentFormData.value, originFormData.value)) {
        callback()
      } else {
        ElMessageBox.confirm(message, t('sc.common.tip'), {
          type: 'warning',
          confirmButtonText,
          cancelButtonText,
        })
          .then(() => {
            callbackExec(
              props?.formWrapComponentProps?.beforeClose,
              currentFormData.value
            )
              .then(() => {
                callback()
              })
              .catch(() => {})
          })
          .catch(() => {})
      }
    }

    const hanlderSaveButtonClick = () => {
      const afterExec = () => {
        isSaveLoading.value = false
        // 将 currentFormData 合并到 originFormData
        assign(originFormData.value, currentFormData.value)
        if (controlStatus.value === EDIT_TYPE.ADD) {
          if (props.dataAddPosition === 'begin') {
            innerDataList.value.unshift(originFormData.value)
            xTable.value?.insertAt(originFormData.value, null)
          } else {
            innerDataList.value.push(originFormData.value)
            xTable.value?.insertAt(originFormData.value, -1)
          }
        }

        detailVisible.value = false
      }
      if (formRef.value) {
        formRef.value?.validate((isValid) => {
          if (isValid) {
            isSaveLoading.value = true
            callFormSave(currentFormData.value, afterExec)
          }
        })
      } else {
        afterExec()
      }
      //  else if (this.$scopedSlots.modifyDialog) {
      //   this.isSaveLoading = true
      //   const res = save(currentFormData, controlStatus)
      //   if (res.then) {
      //     res
      //       .then(() => {
      //         afterExec()
      //       })
      //       .finally(() => {
      //         // 关闭
      //         this.isSaveLoading = false
      //       })
      //   } else if (res) {
      //     afterExec()
      //   }
      // }
    }
    // 取消按钮回调
    const hanlderCancelButtonClick = () => {
      handlerBeforeClose(() => {
        detailVisible.value = false
      })
    }

    // 获取详情的外部展示组件
    const getWrapComponent = () => {
      let component: any = null
      if (props.formWrapComponent === 'drawer') {
        component = ElDrawer
      } else {
        component = ElDialog
      }
      let title = ''
      if (controlStatus.value === EDIT_TYPE.ADD) {
        title = t('sc.schemaTable.addData')
      } else if (controlStatus.value === EDIT_TYPE.UPDATE) {
        title = t('sc.schemaTable.editData')
      } else {
        title = t('sc.schemaTable.viewData')
      }

      return (
        <component
          is={component}
          class="sc-schema-table_editable-wrap-component"
          draggable={true}
          close-on-click-modal={false}
          close-on-press-escape={false}
          append-to-body={true}
          title={title}
          {...props.formWrapComponentProps}
          before-close={handlerBeforeClose}
          v-model={detailVisible.value}
          v-slots={{
            footer: getFooterButton(),
          }}
        >
          {controlStatus.value === EDIT_TYPE.VIEW
            ? getViewDescriptionsRender(currentFormData)
            : getEditFormRender(currentFormData)}
        </component>
      )
    }
    // 表单Reander
    const getEditFormRender = (currentFormData: any) => {
      // 注入status为edit的flag
      const customSlots = {} as { [key: string]: (scope: any) => any }
      Object.keys(slots).forEach((key: string) => {
        customSlots[key] = (scope: any) => {
          return slots[key]?.({ status: 'edit', data: scope })
        }
      })
      let uiSchema: any = null
      watchEffect(() => {
        const res = {} as { [key: string]: any }
        Object.keys(props.uiSchema).forEach((key: string) => {
          res[key] = {
            ...props.uiSchema[key],
            visible:
              props.uiSchema[key]?.visible ||
              props.uiSchema[key]?.formItemVisible,
          }
        })
        uiSchema = res
      })

      return (
        <ScSchemaForm
          label-width="auto"
          label-suffix=":"
          {...props.formProps}
          ref={formRef}
          modelValue={currentFormData.value}
          schema={props.schema}
          ui-schema={uiSchema}
          rules={props.formRules}
        >
          {{
            ...customSlots,
          }}
        </ScSchemaForm>
      )
    }
    // 获取查看状态下的内容
    const getViewDescriptionsRender = (currentFormData: any) => {
      // 注入status为edit的flag
      const customSlots = {} as { [key: string]: (scope: any) => any }
      Object.keys(slots).forEach((key: string) => {
        customSlots[key] = (scope: any) => {
          return slots[key]?.({ status: 'default', data: scope })
        }
      })

      const descriptionsList: any[] = []
      watchEffect(() => {
        Object.keys(props.schema.properties).forEach((key: string) => {
          const item = props.schema.properties[key]
          if (
            item &&
            props.uiSchema[key]?.formItemVisible !== false &&
            props.uiSchema[key]?.visible !== false
          ) {
            descriptionsList.push(
              <ElDescriptionsItem label={item.title}>
                {customSlots[key]
                  ? customSlots[key](currentFormData.value)
                  : currentFormData.value[key]}
              </ElDescriptionsItem>
            )
          }
        })
      })

      return (
        <ElDescriptions column={props?.formProps?.columns || 4} border>
          {descriptionsList}
        </ElDescriptions>
      )
    }

    const getFooterButton = () => {
      return () =>
        controlStatus.value === EDIT_TYPE.VIEW ? (
          <ElButton onClick={() => (detailVisible.value = false)}>
            {t('sc.schemaTable.close')}
          </ElButton>
        ) : (
          <div class="">
            <ElButton
              type="primary"
              loading={isSaveLoading.value}
              onClick={hanlderSaveButtonClick}
            >
              {t('sc.schemaTable.save')}
            </ElButton>
            <ElButton onClick={hanlderCancelButtonClick}>
              {t('sc.schemaTable.cancel')}
            </ElButton>
          </div>
        )
    }
    // 创建新增时的默认相关数据
    const createDefaultRowData = (appendItem = {}) => {
      return new Promise((resolve) => {
        const defaultValue = getSchemaDefaultObject(props.schema)
        defaultValue[props.changeModeField] = EDIT_TYPE.ADD
        const afterExec = (res: any) => {
          resolve(merge({}, res, appendItem))
        }
        if (isFunction(props.beforeAddRow)) {
          const addRes = props.beforeAddRow(defaultValue)
          if (addRes && addRes.then) {
            addRes.then((res: any) => {
              afterExec(merge({}, res, appendItem))
            })
          } else {
            afterExec(merge({}, addRes, appendItem))
          }
        } else {
          afterExec(merge({}, defaultValue, appendItem))
        }
      })
    }
    const deleteRowData = (deleteList: any[]) => {
      return new Promise((resolve, reject) => {
        ElMessageBox.confirm(
          t('sc.schemaTable.confirmDelete'),
          t('sc.commom.tip'),
          {
            type: 'warning',
          }
        )
          .then(() => {
            const afterExec = () => {
              deleteList.forEach((delItem: any) => {
                const index = innerDataList.value.findIndex(
                  (item: any) =>
                    item[innerRowKey.value] === delItem[innerRowKey.value] &&
                    item[props.changeModeField] !== EDIT_TYPE.DELETE
                )
                // 如果是新添加的记录，直接从data中删除
                if (delItem[props.changeModeField] === EDIT_TYPE.ADD) {
                  if (index > -1) {
                    innerDataList.value.splice(index, 1)
                  }
                } else {
                  // changeMode标识为 DELETE
                  delItem[props.changeModeField] = EDIT_TYPE.DELETE
                  innerDataList.value.splice(index, 1, delItem)
                }
              })
              // xTable.value?.updateData()
              // this.emitSelectionChange([])
              resolve({})
            }

            controlStatus.value = EDIT_TYPE.DELETE
            callFormSave(deleteList, afterExec)
          })
          .catch(() => {
            reject()
          })
      })
    }

    const handlerAddTableRow = () => {
      controlStatus.value = EDIT_TYPE.ADD
      // if (onAddRowClick != null && _.isFunction(onAddRowClick)) {
      //   onAddRowClick();
      //   return;
      // }
      // 弹窗编辑数据的场合
      createDefaultRowData().then((res) => {
        initialRowData(res)
        detailVisible.value = true
      })
    }

    const handlerBatchDeleteTableRow = () => {
      deleteRowData(selectionList.value)
    }

    const getTopButton = () => {
      if (props.canAdd) {
        return (
          <ElLink underline={false} type="primary" onClick={handlerAddTableRow}>
            {t('sc.schemaTable.addData')}
          </ElLink>
        )
      }
      return null
    }
    const getTopButtonByAfter = () => {
      if (props.canDelete) {
        return (
          <ElLink
            underline={false}
            type="primary"
            onClick={handlerBatchDeleteTableRow}
          >
            {t('sc.schemaTable.batchDelete')}
          </ElLink>
        )
      }
      return null
    }

    return {
      topButtonRender: () => {
        if (props.labelMode === true || props.isShowTopButton === false) {
          return <div></div>
        }
        return (
          <div class="sc-schema-table_top-area-left-button">
            {getTopButton()}
            {slots?.batchControl}
            {getTopButtonByAfter()}
          </div>
        )
      },
      detailFormRender: () => {
        return getWrapComponent()
      },
      // 设置操作按钮区域内容
      setOperColumn: (ret: any[]) => {
        if (!props.showOper) {
          return
        }
        // const { t } = useLocale()

        const onCustomButtonClick = (key: string, scope: any) => {
          return (event?: Event) => {
            if (event) {
              event.preventDefault()
              event.stopPropagation()
            }
            emit('oper-button-click', key, scope)
            const currentRow = scope.row
            //   // 修改按钮点击事件处理
            if (key === MODIFY_BUTTON.key) {
              // this.controlStatus = EDIT_TYPE.UPDATE
              // 对话框编辑数据的场合
              // if (!isEditOnRow) {
              const exec = (appendInfo?: any) => {
                currentRow[props.changeModeField] = EDIT_TYPE.UPDATE
                controlStatus.value = EDIT_TYPE.UPDATE
                initialRowData(currentRow, appendInfo)
                detailVisible.value = true
              }
              if (isFunction(props.beforeUpdateRow)) {
                const afterExec = (updatedRow: any) => {
                  // if (updatedRow) {
                  //   // scope.row = assign(scope.row, updatedRow)
                  //   currentRow = assign(currentRow, updatedRow)
                  // }
                  exec(updatedRow)
                }
                const updateRes = props.beforeUpdateRow(scope)
                if (updateRes && updateRes.then) {
                  updateRes.then((res: any) => {
                    afterExec(res)
                  })
                } else {
                  afterExec(updateRes)
                }
              } else {
                exec()
              }
              // }
              //  else {
              //   // // 行上编辑数据的场合
              //   // if (this.editingRow) {
              //   //   this.$message({
              //   //     message: t('el.protable.onlyEditOne'),
              //   //     type: 'error'
              //   //   });
              //   //   return;
              //   // }
              //   const afterExec = (updatedRow) => {
              //     if (updatedRow) {
              //       scope.row = _.assign(scope.row, updatedRow)
              //       currentRow = _.assign(currentRow, updatedRow)
              //     }
              //     this.initialRowData(currentRow)
              //     this.editingRow = scope.row
              //     this.setActiveRow()
              //   }
              //   if (typeof beforeUpdateRow === 'function') {
              //     const updateRes = beforeUpdateRow(scope)
              //     if (updateRes && updateRes.then) {
              //       updateRes.then((res) => {
              //         afterExec(res)
              //       })
              //     } else {
              //       afterExec(updateRes)
              //     }
              //   } else {
              //     afterExec()
              //   }
              // }
              // 删除按钮点击事件处理
            } else if (key === DELETE_BUTTON.key) {
              deleteRowData([currentRow])
            } else if (key === VIEW_BUTTON.key) {
              controlStatus.value = EDIT_TYPE.VIEW
              initialRowData(currentRow)
              detailVisible.value = true
            }
          }
        }

        ret.push({
          title: t('sc.schemaTable.operation'),
          fixed: 'right',
          align: 'center',
          type: 'operation',
          width: props.operWidth,
          className: 'sc-schema-table__control-column',
          slots: {
            default(scope: any) {
              const controlColumnDefaultSlot: any = []
              const maxDisplayCount = props.operMaxDisplayCount
                ? props.operMaxDisplayCount + 1
                : props.operMaxDisplayCount

              // if ($scopedSlots.controlColumn) {
              //   controlColumnDefaultSlot.push($scopedSlots.controlColumn(scope));
              //   return controlColumnDefaultSlot;
              // }
              let rowButtonList = [] as any[]
              // 添加自定义按钮的前提是必须为非行内编辑激活状态
              if (
                props.operButtons
                //  && !getIsEditOnRow()
              ) {
                rowButtonList = props.operButtons(scope) || []
              }
              // if ($scopedSlots.rowButtons && !getIsEditOnRow()) {
              //   rowButtonList.push({render: (scope) => {
              //     return (
              //       $scopedSlots.rowButtons(scope)
              //     );
              //   }});
              // }

              if (!props.labelMode) {
                if (props.canDelete) {
                  const deleteButtonRender = () => {
                    rowButtonList.push(DELETE_BUTTON)
                  }
                  if (isFunction(props.canDeleteRow)) {
                    if (props.canDeleteRow(scope)) {
                      deleteButtonRender()
                    }
                  } else {
                    deleteButtonRender()
                  }
                }
                if (props.canUpdate) {
                  const modifyButtonRender = () => {
                    rowButtonList.unshift(MODIFY_BUTTON)
                  }
                  if (isFunction(props.canUpdateRow)) {
                    if (props.canUpdateRow(scope)) {
                      modifyButtonRender()
                    }
                  } else {
                    modifyButtonRender()
                  }
                }
              }
              if (props.canView) {
                const viewButtonRender = () => {
                  rowButtonList.unshift(VIEW_BUTTON)
                }
                if (isFunction(props.canViewRow)) {
                  if (props.canViewRow(scope)) {
                    viewButtonRender()
                  }
                } else {
                  viewButtonRender()
                }
              }
              if (!isEmpty(rowButtonList)) {
                if (rowButtonList.length <= maxDisplayCount) {
                  rowButtonList.forEach((button: any) => {
                    let ret: any = {}
                    const classList: any[] = []
                    classList.push('schema-table__control_column_button')
                    // if (render) {
                    //   ret = render(scope)
                    // } else if (label && label.indexOf('el-') === 0) {
                    //   classList.push('pro-table__control_column_icon_button', label)
                    //   ret = (
                    //     <i
                    //       class={classList}
                    //       onClick={onCustomButtonClick(key, scope)}
                    //     ></i>
                    //   )
                    // } else {
                    ret = (
                      <ElLink
                        underline={false}
                        type="primary"
                        class={classList}
                        onClick={onCustomButtonClick(button.key, scope)}
                      >
                        {button.label}
                      </ElLink>
                    )
                    // }
                    controlColumnDefaultSlot.push(ret)
                  })
                } else {
                  let i = 0
                  for (i = 0; i < maxDisplayCount - 1; i += 1) {
                    const btnFirst = rowButtonList[i]
                    controlColumnDefaultSlot.push(
                      <ElLink
                        underline={false}
                        type="primary"
                        onClick={onCustomButtonClick(btnFirst.key, scope)}
                      >
                        {btnFirst.label}
                      </ElLink>
                    )
                  }
                  const onCommand = (key: string) => {
                    onCustomButtonClick(key, scope)()
                    // onCustomButtonClick(key, scope)
                  }
                  const moreElt = (
                    <ElDropdown
                      class="sc-schema-table_column-more-button"
                      onCommand={onCommand}
                      v-slots={{
                        dropdown: () => {
                          return (
                            <ElDropdownMenu>
                              {rowButtonList.map(({ key, label }, index) => {
                                if (index >= i) {
                                  return (
                                    <ElDropdownItem command={key}>
                                      <ElLink type="primary" underline={false}>
                                        {label}
                                      </ElLink>
                                    </ElDropdownItem>
                                  )
                                }
                                return null
                              })}
                            </ElDropdownMenu>
                          )
                        },
                      }}
                    >
                      <ElLink underline={false} type="primary">
                        {t('sc.schemaTable.more')}

                        <ElIcon>
                          <ArrowDown />
                        </ElIcon>
                      </ElLink>
                    </ElDropdown>
                  )
                  controlColumnDefaultSlot.push(moreElt)
                }
              }
              return controlColumnDefaultSlot
            },
          },
        })
      },
    }
  }
