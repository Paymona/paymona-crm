import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import API from '../API/API'
import styles from '../scss/routes/Employees.module.scss'
import { Table, Topbar } from '../organisms'
import { TableRowContainer } from '../molecules'
import { Button } from '../atoms'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../redux/actions/popupActions'
import { PopupAddEmployee, PopupEditEmployee, PopupFitback } from '../popups'

const Employees = ({
  className=''
}) => {

  
  /* Variables */

  const template = ['1fr', '1fr', '1fr', '1fr', '1fr']

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
          text: 'employee',
          active: true
        },
        {
          text: 'superuser',
          active: true
        }
      ]
    }
  ]
  

  /* Redux Hooks */

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  
  /* States */

  const [data, setData] = useState([])

  const [sendData, setSendData] = useState([])


  /* Functions */

  const handleDeleteEmplyeee = id => {
    if (user.type !== 'superuser')
      return dispatch(openPopup('Только superuser способен удалять пользователей'), 100)
    if (id === user.id)
      return dispatch(openPopup('Нельзя удалять самого себя!'), 100)

    const config = {
      url: 'employee/delete/'+id,
      method: 'delete',
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    }
    API(config)
      .then(res => res.data)
      .then(data => setData(data))
  }


  /* UseEffects */

  useEffect(() => {
    const config = {
      url: 'employee/get/',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    }
    API(config)
      .then(res => res.data)
      .then(res => setData(res))
  }, [user.token])


  const SendData = () => {
    const config = {
      url: `/employee/get/`,
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + user.token,
        'Content-Type': 'application/json',
      }
     }
       API(config)
       .then(res => res.data)
       .then(res => setSendData(res) )
  }


  //Function




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
              onClick={() => dispatch(openPopup(<PopupFitback setData={SendData()} title='Добавить сотрудника'/>))}
            >
              Добавить сотрудника
            </Button>
          }
          rowPropsTemplate={['name', 'surname', 'position', 'department', 'type']}
          onEditRow={row_id => dispatch(openPopup(<PopupEditEmployee id={row_id} setData={setData} />))}
          onDeleteRow={row_id => handleDeleteEmplyeee(row_id)}
        />

      </Table>

    </div>
  )
}

export default Employees
