import classNames from 'classnames'
import styles from '../scss/routes/Client.module.scss'
import API from '../API/API'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Button, TableColumn } from '../atoms'
import { dynamicSort } from '../functions'
import { ClientHeaderInfo, TableHeaders, TableRow, TableTools } from '../molecules'
import { Table, Topbar } from '../organisms'
import { PopupAddEmployeeToClient, PopupEditEmployeeToClient, PopupInfoText } from '../popups'
import { openPopup } from '../redux/actions/popupActions'
import { logouting } from '../redux/actions/userActions'

const Client = ({
  className
}) => {

  
  /* Variables */

  const template = useMemo(() => ['1fr', '1fr', '1fr', '1fr'], [])
  const headers = useMemo(() => ['Имя', 'Фамилия', 'Тип', 'Электронная почта'], [])
  const searchPropsDependence = useMemo(() => ['name', 'surname', 'email'], [])
  

  /* Redux Hooks */

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  /* React Router Dom */

  const { id } = useParams()


  /* States */

  const [data, setData] = useState([])
  const [editedTableData, setEditedTableData] = useState([])
  const [tableData, setTableData] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const [sortList, setSortList] = useState([
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
      id: 'type',
      text: 'По типу',
      active: false
    },
    {
      id: 'email',
      text: 'По почте',
      active: false
    }
  ])
  const [filterList, setFilterList] = useState([
    {
      id: 'type',
      text: 'По типу',
      list: [
        {
          text: 'user',
          active: true
        },
        {
          text: 'superuser',
          active: true
        }
      ]
    },
    {
      id: 'products',
      text: 'По продукту',
      list: []
    }
  ])


  /* Effects */

  useEffect(() => {

    const config = {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    }
    
    const dataConfig = {
      ...config,
      url: 'client/get_for_edit/'+id
    }

    API(dataConfig)
      .then(res => res.data)
      .then(data => setData(data))
      .catch(error => {
        if (!error || !error.response) return
        if (error.response.status === 401 && user.status !== 'logouting')
          dispatch(logouting())
      })

    const tableConfig = {
      ...config,
      url: 'client/employee/'+id+'/get_list'
    }

    API(tableConfig)
      .then(res => res.data)
      .then(data => setTableData(data))
      .catch(error => {
        if (!error || !error.response) return
        if (error.response.status === 401 && user.status !== 'logouting') 
          dispatch(logouting())
      })

    API({
      url: 'service/getlist',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + user.token
      },
    })
      .then(res => res.data)
      .then(data => setFilterList(prev => {
        const next = prev.concat()

        next.forEach(filter => {
          if (filter.id === 'products')
            filter.list = data.map(f => {
              return {
                active: true,
                text: f
              }
            })
        })

        return next
      }))
      .catch(error => {
        if (!error || !error.response) return
        if (error.response.status === 401 && user.status !== 'logouting') 
          dispatch(logouting())
      })  
  }, [id, dispatch, user])

  useEffect(() => {

    if (!tableData.length) return

    let searchedData = tableData.filter(row => {
      let access = false
      searchPropsDependence.forEach(searchProp => {
        if (row[searchProp].toLowerCase().indexOf(searchValue.trim().toLowerCase()) !== -1)
          access = true
      })
      return access
    })

    if (searchValue.trim() === '')
      searchedData = tableData.concat()

    let filteredData = searchedData.filter(row => {

      let ok1 = filterList.find(filter => 
        filter.list.find(item => {
          return item.text === row[filter.id] && item.active
        })
      )

      let ok2 = filterList
        .find(filter => filter.id === 'products')
        .list
        .find(product => {
          return product.active && row.products.includes(product.text)
        })

      return ok1 || ok2
    })

    let sortedData = filteredData.sort(dynamicSort(sortList.find(prop => prop.active).id))


    if (sortList.find(prop => prop.active).reverse)
      return setEditedTableData(sortedData.reverse())
    setEditedTableData(sortedData)

  }, [tableData, searchValue, sortList, filterList, searchPropsDependence])


  /* Functions */

  const handleDeleteClientEmployee = employee_id => {

    const config = {
      url: 'client/employee/'+id+'/delete/'+employee_id,
      method: 'delete',
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    }
    API(config)
      .then(res => res.data)
      .then(_data => setTableData(_data))
      .catch(error => {
        if (!error || !error.response) return
        if (error.response.status === 401 && user.status !== 'logouting') 
          dispatch(logouting())
      })
  }


  /* Render */

  if (!data) return <></>
  return (
    <div 
      className={classNames(
        className, 
        styles.root
      )}
    >

      <Topbar
        titleList={[
          {
            text: 'Клиенты',
            link: '/clients'
          },
          {
            text: 'Подробная информация',
            link: '/clients/'+id
          }
        ]}
      />

      <Table className={styles.table}>
        <ClientHeaderInfo 
          id={id}
          logo={data.logo}
          title={data.name}
          domain={data.domain_name}
          products={data.products}
        />

        <TableTools 
          hasFilter
          sortList={sortList}
          filterList={filterList}
          searchValue={searchValue}
          setSortList={setSortList}
          setFilterList={setFilterList}
          setSearchValue={setSearchValue}
        >
          {user.type === 'superuser' ? 
            <Button
              type='outlined' 
              onClick={() => dispatch(openPopup(<PopupAddEmployeeToClient id={id} setData={setTableData} />))}
            >
              Добавить пользователя
            </Button>
          : ''}
        </TableTools>

        <TableHeaders template={template} hasMenu={user.status === 'superuser'}>
          {headers.map(col => 
            <TableColumn key={col}>
              {col}
            </TableColumn>  
          )}
        </TableHeaders>

        {editedTableData.map((row, index) => 
          <div
            key={row.id} 
            className={classNames(
              styles.rowButton
            )}
          >
            <TableRow
              hasMenu={user.status === 'superuser'}
              id={row.id} 
              clickable={false}
              honest={index%2===0}
              template={template}
              menu={
                <Menu 
                  onEditRow={() => dispatch(openPopup(
                    <PopupEditEmployeeToClient 
                      id={row.id} 
                      clientId={id} 
                      setData={_data => setTableData(_data)} 
                    />
                  ))} 
                  onDeleteRow={() => 
                    dispatch(openPopup(
                      <PopupInfoText 
                        onBtn1Click={() => handleDeleteClientEmployee(row.id)} 
                        text='Вы уверены, что хотите удалить пользователя?'
                        btn2Text='Отмена'
                        btn1Text='Уверен'
                      />
                    ))
                  } 
                />
              }
            >
              {['name', 'surname', 'type', 'email'].map((prop, index) => 
                <TableColumn key={index}>
                  {row[prop]}
                </TableColumn>  
              )}
            </TableRow>  
          </div>
        )}
      </Table>
      
    </div>
  )
}

const Menu = ({
  onEditRow, onDeleteRow
}) => {

  return (
    <>
      <button onClick={() => onEditRow()}>
        Редактировать
      </button>
      <button onClick={() => onDeleteRow()}>
        Удалить
      </button>
    </>
  )
}

export default Client
