import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import API from '../API/API'
import { ErrorText } from '../atoms'
import { toBase64 } from '../functions'
import { AddCircle, ArrowHadSmallBottom, CheckBox, CheckBoxOutlineBlank } from '../icons'
import { AnimatedInput, DropDownInput, FooterPanelInPopup, TopPanelInPopup } from '../molecules'
import { Wrap } from '../organisms'
import { closePopup } from '../redux/actions/popupActions'
import { logouting } from '../redux/actions/userActions'
import styles from '../scss/popups/PopupEditClient.module.scss'

const PopupEditClient = ({
  id=0,
  className='',
  setData=()=>{}
}) => {
  

  /* Redux Hooks */

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  

  /* States */
  
  // ValidationErrors
  const [validation_errors, setValidation_errors] = useState([])
  
  // Avatar
  const [avatar, setAvatar] = useState(null)
  
  // name
  const [name__inputValue, setName__inputValue] = useState('')
  
  // domain
  const [domain__inputValue, setDomain__inputValue] = useState('') 
  const [domain__inputFocusing, setDomain__inputFocusing] = useState(false)
  
  // IP
  const [IP__inputValue, setIP__inputValue] = useState('') 
  const [IP__inputFocusing, setIP__inputFocusing] = useState(false)

  // selected products
  const [products__selected, setProducts__selected] = useState([])
  const [products__initialFocusing, setProducts__initialFocusing] = useState(false)


  /* Functions */
  
  const checkValidation = () => {
    const errors = [] 

    if (name__inputValue.trim() === '') 
      errors.push({type: 'name', text: 'Введите название клиента'}) 

    if (domain__inputValue.trim() === '') 
      errors.push({type: 'domain', text: 'Введите домен клиента'}) 

    if (IP__inputValue.trim() === '') 
      errors.push({type: 'ip', text: 'Введит ip-сервера клиента'}) 

    if (!products__selected.length) 
      errors.push({type: 'products', text: 'Выберите хотябы один продукт для клиента'})

    setValidation_errors(errors)

    return !errors.length
  }

  const handleEditClient = () => {

    const logo = avatar

    if (!checkValidation())
      return

    const config = {
      url: 'client/patch/'+id,
      method: 'patch',
      headers: {
        'Authorization': 'Bearer ' + user.token
      },
      data: JSON.stringify([
        {
          patch: 'name',
          to: name__inputValue.trim()
        },
        {
          patch: 'domain_name',
          to: domain__inputValue.trim()
        },
        {
          patch: 'ip_address',
          to: IP__inputValue.trim()
        },
        {
          patch: 'logo',
          to: logo
        },
        {
          patch: 'products',
          to: products__selected
        }
      ])
    }

    API(config)
      .then(res => res.data)
      .then(data => {
        setData(data)
        dispatch(closePopup())
      })
      .catch(error => {
        if (!error || !error.response) return
        if (error.response.status === 401 && user.status !== 'logouting') 
          dispatch(logouting())
      })
  }


  /* UseEffects */
  
  useEffect(() => {
    const config = {
      method: 'get',
      url: 'client/get_for_edit/'+id,
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    }
    API(config)
      .then(res => res.data)
      .then(res => {
        setName__inputValue(res.name)
        setDomain__inputValue(res.domain_name)
        setIP__inputValue(res.ip_address)
        setProducts__selected(res.products)
        setAvatar(res.logo)
      })
      .catch(error => {
        if (!error || !error.response) return
        if (error.response.status === 401 && user.status !== 'logouting') {
          dispatch(logouting())
          
        }
      })
  }, [id, dispatch, user])


  /* Render */
  
  return (
    <div className={classNames(className, styles.root)}>

      <TopPanelInPopup title='Редактировать клиента' />

      <Wrap flex column gap={24} className={styles.content}>

        <Wrap flex alignCenter spaceBetween gap={24}>

          {/********************* Avatar *********************/}
          <label className={styles.img_wrap}>
            <div className={styles.plus_icon}>
              <AddCircle size={30} />
            </div>
            <div className={styles.img}>
              {avatar && <img src={avatar} alt="" />}
            </div>
            <input 
              className={styles.inputFile} 
              type="file" 
              onChange={async e => setAvatar(await toBase64(e.target.files[0]))} 
              accept="image/png, image/gif, image/jpeg" 
            />
          </label>

          <Wrap flex column gap={24} autoWidth={false} grow={1}>
            {/********************* Name *********************/}
            <Wrap flex column gap={4}>
              <AnimatedInput
                autoWidth
                placeholder='Наименование' 
                value={name__inputValue}
                setValue={setName__inputValue}
                initialFocusing={true}
                error={validation_errors.find(error => error.type === 'name')}
                onKeyPress={e => {
                  if (e.code === 'Enter')
                    setDomain__inputFocusing(true)
                }}
              />
              {validation_errors.find(error => error.type === 'name') &&
                <ErrorText>
                  {validation_errors.find(error => error.type === 'name').text}
                </ErrorText>
              }
            </Wrap>

            {/********************* Domain *********************/}
            <Wrap flex column gap={4}>
              <AnimatedInput
                autoWidth
                placeholder='Доменный адрес' 
                value={domain__inputValue}
                setValue={setDomain__inputValue}
                initialFocusing={domain__inputFocusing}
                error={validation_errors.find(error => error.type === 'domain')}
                onKeyPress={e => {
                  if (e.code === 'Enter')
                    setIP__inputFocusing(true)
                }}
              />
              {validation_errors.find(error => error.type === 'domain') &&
                <ErrorText>
                  {validation_errors.find(error => error.type === 'domain').text}
                </ErrorText>
              }
            </Wrap>
          </Wrap>

        </Wrap>

        {/********************* IP *********************/}
        <Wrap flex column gap={4}>
          <AnimatedInput
            autoWidth
            placeholder='IP-сервера' 
            value={IP__inputValue}
            setValue={setIP__inputValue}
            initialFocusing={IP__inputFocusing}
            error={validation_errors.find(error => error.type === 'ip')}
            onKeyPress={e => {
              if (e.code === 'Enter')
                setProducts__initialFocusing(true)
            }}
          />
          {validation_errors.find(error => error.type === 'ip') &&
            <ErrorText>
              {validation_errors.find(error => error.type === 'ip').text}
            </ErrorText>
          }
        </Wrap>

        {/********************* Products *********************/}
        <Wrap flex column gap={4}>
          <DropDownInput
            id='1'
            autoWidth
            arrow={<ArrowHadSmallBottom />}
            closeWhenClickMenu={false}
            text={
              <>
                {products__selected.length ? 
                `(${products__selected.join(', ')})` : 
                `Выберите продукт`}
              </>
            }
            initialOpening={products__initialFocusing}
            error={validation_errors.find(error => error.type === 'products') && !products__selected.length}
            onClose={() => setProducts__initialFocusing(false)}
            active={products__selected.length}
          >
            <Menu 
              onClick={type => {
                if (products__selected.includes(type))
                  setProducts__selected(products__selected.filter(product => product !== type))
                else
                  setProducts__selected([...products__selected, type]
              )}}
              products__selected={products__selected} 
            />
          </DropDownInput>
          {validation_errors.find(error => error.type === 'products') && !products__selected.length &&
            <ErrorText>
              {validation_errors.find(error => error.type === 'products').text}
            </ErrorText>
          }
        </Wrap>

      </Wrap>

      <FooterPanelInPopup
        btn1='Сохранить'
        btn2='Отмена'
        onClick={() => handleEditClient()}
      />    
      
    </div>
  )
}

const Menu = ({
  onClick=()=>{},
  products__selected=()=>{}
}) => {

  const [productsList, setProductsList] = useState([])
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    API({
      url: 'service/getlist',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + user.token
      },
    })
      .then(res => res.data)
      .then(data => setProductsList(data))
      .catch(error => {
        if (!error || !error.response) return
        if (error.response.status === 401 && user.status !== 'logouting') 
          dispatch(logouting())
      })
  }, [user, dispatch])

  return (
    <>
      {productsList.map(product => 
        <button 
          key={product}
          className={classNames(
            styles.dropdown_menu_item, 
            products__selected.includes(product) && styles.dropdown_menu_item__active
          )} 
          onClick={() => onClick(product)}
        >
          <div className={styles.dropdown_menu_item__checkbox}>
            {products__selected.includes(product) ?
              <CheckBox size={20} /> : <CheckBoxOutlineBlank size={20} />
            }
          </div>
          {product}
        </button>
      )}
    </>
  )
}

export default PopupEditClient
