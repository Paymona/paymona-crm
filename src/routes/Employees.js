import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import API from '../API/API'
import styles from '../scss/routes/Employees.module.scss'
import { Table, Topbar } from '../organisms'
import { TableRowContainer } from '../molecules'
import { Button } from '../atoms'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../redux/actions/popupActions'
import { PopupAddEmployee } from '../popups'

const Employees = ({
  className=''
}) => {

  
  /* Variables */

  const template = ['1fr', '1fr', '1fr', '1fr', '1fr']
  

  /* Redux Hooks */

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  
  /* States */

  const [data, setData] = useState([])

  const sortList = [
    {
      id: 'name',
      text: 'По имени',
      active: true
    },
    {
      id: 'surname',
      text: 'По фамилии',
      active: false
    },
    {
      id: 'position',
      text: 'По должности',
      active: false
    },
    {
      id: 'departament',
      text: 'По отделу',
      active: false
    },
    {
      id: 'type',
      text: 'По типу',
      active: false
    }
  ]
  const filterList = [
    {
      id: 'type',
      text: 'По типу',
      list: [
        {
          text: 'sales',
          active: true
        },
        {
          text: 'teamlead',
          active: true
        },
        {
          text: 'employe',
          active: true
        },
        {
          text: 'superuser',
          active: true
        }
      ]
    }
  ]


  /* UseEffects */

  useEffect(() => {
    const config = {
      url: 'employee/get/',
      method: 'get',
      headers: {
        'Authorization': user.token
      }
    }
    API(config)
      .then(res => res.data)
      .then(res => setData(res))
  }, [user.token])


  /* Render */

  return (
    <div className={classNames(className, styles.root)}>

      <Topbar 
        titleList={[
          {
            text: 'Сотрудники',
            link: '/employees'
          }
        ]} 
      />

      <Table className={styles.table}>

        <TableRowContainer
          data={data}
          template={template}
          headers={['Имя', 'Фамилия', 'Должность', 'Отдел', 'Тип']}
          initialSortList={sortList}
          initialFilterList={filterList}
          toolsChildren={
            <Button 
              type='outlined' 
              onClick={() => dispatch(openPopup(<PopupAddEmployee title='Добавить сотрудника'/>))}
            >
              Добавить сотрудника
            </Button>
          }
          menu={<Menu />}
          rowPropsTemplate={['name', 'surname', 'position', 'department', 'type']}
        />

      </Table>

    </div>
  )
}

const Menu = () => {
  return (
    <>
      <button >
        Редактировать
      </button>
      <button>
        Удалить
      </button>
    </>
  )
}

export default Employees
