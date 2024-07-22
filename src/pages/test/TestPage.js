import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';

import {
  AdjustmentsVerticalIcon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowUpRightIcon,
  ChartPieIcon,
  CalendarIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

import DefaultPage from '../../components/DefaultPage/DefaultPage.tsx';
import ContentCard from '../../components/ContentCard/ContentCard.tsx';
import SubContentCard from '../../components/SubContentCard/SubContentCardComponent';
import Title from '../../components/Title/Title.tsx';
import Chip from '../../components/Chip/Chip.tsx';
import ContentNotFound from '../../components/ContentNotFound/ContentNotFound.tsx';
import UserCard from '../../components/UserCard/UserCard.tsx';
import ListItem from '../../components/ListItem/ListItem';
import DropdownTitle from '../../components/Dropdown Components/DropdownTitle/DropdownTitle';
import DropdownItemContent from '../../components/Dropdown Components/DropdownItemContent/DropdownItemContent';
import TableCard from '../../components/TableCard/TableCard.tsx';
import PaginatedTable from '../../components/PaginatedTable/PaginatedTable';

import NavPills from '../../components/NavPills/NavPills';
import FormInput from '../../components/FormInput/FormInput.tsx';
import FormControl from '../../components/FormControl/FormControl.tsx';

import Form from 'react-bootstrap/Form';
import Button from '../../components/Button/Button.tsx';

import sacoaLogo from '../../static/images/sacoa-logo-big.png';
import defaultAvatar from '../../static/images/default-avatar.jpg';
import fakeData from './data.json';
import Text from '../../components/Text/Text.tsx';

function TestPage() {
  const [showModal, setShowModal] = useState(false);

  const companies = ['Hasbro City', 'Adventure Land', 'Game On'];
  const reports = ['POS Reports', 'Kiosk Reports', 'Exchange Breakdown'];

  const fakeTableData = [
    {
      productName: 'R$100,00 Load',
      price: 100,
      amountSold: 2222,
    },
    {
      productName: 'R$75,00 Load',
      price: 75,
      amountSold: 2402,
    },
    {
      productName: 'R$30,00 Load',
      price: 30,
      amountSold: 304,
    },
    {
      productName: 'R$20,00 Load',
      price: 20,
      amountSold: 2422,
    },
    {
      productName: 'R$50,00 Load',
      price: 50,
      amountSold: 403,
    },
  ];

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const tabItens = [
    {
      id: 1,
      tabIcon: <ChartPieIcon />,
      tabLabel: 'Teste1',
      tabComponent: <ChartPieIcon width={20} />,
    },
    {
      id: 2,
      tabIcon: <ArrowRightStartOnRectangleIcon />,
      tabLabel: 'Teste2',
      tabComponent: <ArrowRightStartOnRectangleIcon width={20} />,
    },
    {
      id: 3,
      tabIcon: <ArrowUpRightIcon />,
      tabLabel: 'Teste3',
      tabComponent: <ArrowUpRightIcon width={20} />,
    },
    {
      id: 4,
      tabLabel: 'Teste4',
      tabComponent: <ArrowUpRightIcon width={20} />,
    },
    {
      id: 5,
      tabLabel: 'Teste5',
      tabComponent: <ArrowUpRightIcon width={20} />,
    },
  ];

  const [searchInputValue, setSearchInputValue] = useState();

  return (
    <>
      <DefaultPage title={'Central Testing'} subtitle={'Olá, Mundo'}>
        <Row>
          <ContentCard>
            <Text size="lg">Teste Large</Text>
            <Text size="md">Teste Medium</Text>
            <Text size="sm">Teste Small</Text>
          </ContentCard>
        </Row>
        <Row>
          <ContentCard>
            <FormControl submitButtonText={'Enviar'}>
              <FormInput
                id={'Text'}
                label={'Texto'}
                type={'text'}
                placeholder={'Escreva aqui'}
                hasPrefixIcon={false}
                hasSuffixIcon={false}
              />
              <FormInput
                id={'search'}
                label={'Search'}
                type={'search'}
                value={searchInputValue}
                placeholder={'Search'}
                hasPrefixIcon={true}
                hasSuffixIcon={true}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
              <FormInput
                id={'email'}
                label={'Email'}
                type={'email'}
                placeholder={'teste'}
                formText={'Seu email não será compartilhado com ninguém'}
              />
              <FormInput
                id={'password'}
                label={'password'}
                type={'password'}
                placeholder={'teste'}
                hasPrefixIcon={true}
                hasSuffixIcon={true}
              />
            </FormControl>
          </ContentCard>
        </Row>
        <Row>
          <TableCard>
            <Title
              title={'Pagination Table'}
              type={'tablecard'}
              size="sm"
              suffixChip={<Chip size={'sm'}>{fakeData.length} records</Chip>}
            />
            <PaginatedTable data={fakeData} PageSize={5}>
              {(currentTableData) => (
                <>
                  <Table striped hover className="custom-table">
                    <thead>
                      <tr>
                        <th style={{ width: '100px' }}>ID</th>
                        <th>Title</th>
                      </tr>
                    </thead>
                    {currentTableData.length > 0 ? (
                      <tbody>
                        {currentTableData.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody></tbody>
                    )}
                  </Table>
                  {currentTableData.length === 0 && (
                    <ContentNotFound
                      type="search"
                      title={'No company found'}
                      text={'Your search "Lorem" did not match any companies.'}
                      buttonText={'Clear Search'}
                    />
                  )}
                </>
              )}
            </PaginatedTable>
          </TableCard>
        </Row>
        <Row>
          <ContentCard>
            <Title title={'Nav Pills'} />
            <NavPills defaultTabId={2} tabItems={tabItens}></NavPills>
          </ContentCard>
        </Row>
        <Row>
          <TableCard>
            <Title title={'Example Table'} type={'tablecard'} />

            <Table striped hover className="custom-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Teste</th>
                  <th style={{ textAlign: 'end' }}>Total</th>
                </tr>
              </thead>
            </Table>
            <ContentNotFound
              type="search"
              title={'No company found'}
              text={'Your search "Lorem" did not match any companies.'}
              buttonText={'Clear Search'}
            />
          </TableCard>
        </Row>
        <Row>
          <Col>
            <TableCard>
              <Title
                title={'Example Table'}
                subTitle={'test table'}
                type={'tablecard'}
                suffixComponent={
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-icon-button" className="border-disabled">
                      <DropdownTitle iconComponent={<EllipsisVerticalIcon />} showDropIcon={false} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu id="dropdown-custom-menu">
                      <Dropdown.Item href="#">
                        <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              />

              <Table striped hover responsive className="custom-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Teste</th>
                    <th>Product</th>
                    <th>Teste</th>
                    <th style={{ textAlign: 'end' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {fakeTableData ? (
                    fakeTableData
                      .sort((a, b) => {
                        return b.amountSold - a.amountSold;
                      })
                      .slice(0, 4)
                      .map((item) => (
                        <tr>
                          <td>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexWrap: 'wrap',
                                justifyContent: `center`,
                                minHeight: 'inherit',
                              }}
                            >
                              <span>{item.productName}</span>
                              <span>Amount: {item.amountSold}</span>
                            </div>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            Teste
                            <br />
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            Teste
                            <br />
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            Teste
                            <br />
                          </td>
                          <td style={{ textAlign: 'end', verticalAlign: 'middle' }}>
                            <span>{item.price}</span>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        <span>No data</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableCard>
          </Col>
          <Col>
            <TableCard>
              <Title
                title={'Example Table'}
                subTitle={'test table'}
                type={'tablecard'}
                suffixComponent={
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-icon-button" className="border-disabled">
                      <DropdownTitle iconComponent={<EllipsisVerticalIcon />} showDropIcon={false} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu id="dropdown-custom-menu">
                      <Dropdown.Item href="#">
                        <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              />

              <Table striped hover className="custom-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Teste</th>
                    <th style={{ textAlign: 'end' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {fakeTableData ? (
                    fakeTableData
                      .sort((a, b) => {
                        return b.amountSold - a.amountSold;
                      })
                      .slice(0, 4)
                      .map((item) => (
                        <tr>
                          <td>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexWrap: 'wrap',
                                justifyContent: `center`,
                                minHeight: 'inherit',
                              }}
                            >
                              <span>{item.productName}</span>
                              <span>Amount: {item.amountSold}</span>
                            </div>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            Teste
                            <br />
                          </td>
                          <td style={{ textAlign: 'end', verticalAlign: 'middle' }}>
                            <span>{item.price}</span>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        <span>No data</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableCard>
          </Col>
          <Col>
            <TableCard>
              <Title
                title={'Example Table'}
                subTitle={'test table'}
                type={'tablecard'}
                suffixComponent={
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-icon-button" className="border-disabled">
                      <DropdownTitle iconComponent={<EllipsisVerticalIcon />} showDropIcon={false} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu id="dropdown-custom-menu">
                      <Dropdown.Item href="#">
                        <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              />

              <Table striped hover className="custom-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Teste</th>
                    <th style={{ textAlign: 'end' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {fakeTableData ? (
                    fakeTableData
                      .sort((a, b) => {
                        return b.amountSold - a.amountSold;
                      })
                      .slice(0, 4)
                      .map((item) => (
                        <tr>
                          <td>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexWrap: 'wrap',
                                justifyContent: `center`,
                                minHeight: 'inherit',
                              }}
                            >
                              <span>{item.productName}</span>
                              <span>Amount: {item.amountSold}</span>
                            </div>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            Teste
                            <br />
                          </td>
                          <td style={{ textAlign: 'end', verticalAlign: 'middle' }}>
                            <span>{item.price}</span>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        <span>No data</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableCard>
          </Col>
        </Row>
        <Row>
          <ContentCard>
            <Title title={`Dropdown Buttons`} />

            <h5>Normal Button</h5>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-text-button">
                <DropdownTitle text="Filter by Store" />
              </Dropdown.Toggle>
              <Dropdown.Menu id="dropdown-custom-menu">
                <Dropdown.Item href="#">
                  <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <br />

            <h5>Icon Text Button</h5>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-icon-text-button">
                <DropdownTitle text="Filter by Date" iconComponent={<CalendarIcon />} />
              </Dropdown.Toggle>
              <Dropdown.Menu id="dropdown-custom-menu">
                <Dropdown.Item href="#">
                  <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <br />

            <h5>Text Button</h5>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-text-button">
                <DropdownTitle text="Filter by Date" showDropIcon={false} />
              </Dropdown.Toggle>
              <Dropdown.Menu id="dropdown-custom-menu">
                <Dropdown.Item href="#">
                  <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <br />

            <h5>Icon Button</h5>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-icon-button">
                <DropdownTitle iconComponent={<EllipsisHorizontalIcon />} showDropIcon={false} />
              </Dropdown.Toggle>
              <Dropdown.Menu id="dropdown-custom-menu">
                <Dropdown.Item href="#">
                  <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <h5>Icon Button no Border</h5>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-icon-button" className="border-disabled">
                <DropdownTitle iconComponent={<EllipsisHorizontalIcon />} showDropIcon={false} />
              </Dropdown.Toggle>
              <Dropdown.Menu id="dropdown-custom-menu">
                <Dropdown.Item href="#">
                  <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <DropdownItemContent iconComponent={<CalendarIcon />} text={'Teste'} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ContentCard>
        </Row>
        <Row>
          <ContentCard>
            <Title title={'List Item'} />
            <p>Image List Item</p>
            {companies.map((company) => (
              <ListItem
                imageSrc={sacoaLogo}
                text={company}
                subtext={'Select Company'}
                hover={true}
                OnClickAction={() => console.log('ola')}
                suffixComponent={<ArrowUpRightIcon height={30} />}
              />
            ))}
            <p>Icon List Item</p>
            {reports.map((report) => (
              <ListItem
                iconComponent={<ChartPieIcon />}
                text={report}
                subtext={'This is a test favorite report'}
                suffixComponent={<ArrowUpRightIcon height={30} />}
              />
            ))}
            <p>Subcard Type List Item</p>
            {companies.map((company) => (
              <ListItem
                imageSrc={sacoaLogo}
                type={'subcard'}
                text={company}
                hover={true}
                subtext={'Select Company'}
                suffixComponent={<ArrowUpRightIcon height={30} />}
              />
            ))}
          </ContentCard>
        </Row>
        <Row>
          <ContentCard>
            <Title title={'User Card'} />
            <UserCard
              imageSrc={defaultAvatar}
              text={'Nome Sobrenome'}
              subtext={'davi.gouveia@lanevo.com.br'}
              suffixComponent={<ArrowRightStartOnRectangleIcon height={24} />}
            />
            <hr />
            <UserCard imageSrc={defaultAvatar} text={'Nome Sobrenome'} subtext={'davi.gouveia@lanevo.com'} />
          </ContentCard>
        </Row>
        <Row>
          <ContentCard>
            <Title title={'Content not found'} />
            <ContentNotFound
              type="search"
              title={'No company found'}
              text={'Your search "Lorem" did not match any companies.'}
              buttonText={'Clear Search'}
            />
          </ContentCard>
        </Row>
        <Row>
          <ContentCard>
            <Title title={'Modal'} />
            <Button text="Open Modal" type="primary" onClick={handleShowModal} />

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Body className={'default-modal-body'}>
                <Title
                  title={`Modal Example`}
                  type={'Modal'}
                  suffixComponent={
                    <XMarkIcon
                      height={22}
                      onClick={handleCloseModal}
                      style={{
                        cursor: 'pointer',
                        transform: 'translateY(-2px)',
                        marginRight: '0.5em',
                        color: 'var(--text-color)',
                      }}
                    />
                  }
                />
                <SubContentCard>
                  <Title title={'Report Configuration'} size={'sm'} />
                  teste
                </SubContentCard>
                Woohoo, you are reading this text in a modal!
              </Modal.Body>
              <Modal.Footer className={'default-modal-footer'}>
                <Button text="Cancel" type="light" onClick={handleCloseModal} />
                <Button text="Save" type="primary" onClick={handleCloseModal} />
              </Modal.Footer>
            </Modal>
          </ContentCard>
        </Row>
        <Row>
          <ContentCard>
            <Title title={'switches'} />
            <span>Default Switch</span>
            <Form.Switch id="default-switch" />
            <span>Large Switch</span>
            <Form.Switch id="large-switch" />
            <span>Disabled Switch</span>
            <Form.Switch id="default-switch" disabled />
          </ContentCard>
        </Row>
        <Row>
          <ContentCard>
            <Title title={'Chips'} />
            <Row className="mb-3">
              <Chip variant="success" valueStatus="increase">
                100%
              </Chip>
              <Chip variant="neutral" valueStatus="neutral">
                50%
              </Chip>
              <Chip variant="danger" valueStatus="decrease">
                $25,00
              </Chip>
            </Row>
            <Row className="mb-3">
              <Chip variant="success">Selected</Chip>
              <Chip variant="neutral">200 records</Chip>
              <Chip variant="danger">Warning</Chip>
            </Row>
            <Row className="mb-3 d-flex align-items-center">
              <Chip variant="success" size="lg">
                Large
              </Chip>
              <Chip variant="danger" size="md">
                Medium
              </Chip>
              <Chip variant="success" size="sm">
                Small
              </Chip>
            </Row>
          </ContentCard>
        </Row>
        <Row>
          <ContentCard>
            <Title title={'primary, light'} />
            <Button text="Primary" type="primary" /> <Button text="Light" type="light" />
          </ContentCard>
        </Row>

        <Row>
          <ContentCard>
            <Title title={'outline-primary com icone'} />
            <Button text="Filters" type="outline" prefixIcon={<AdjustmentsVerticalIcon />} />
          </ContentCard>
        </Row>
      </DefaultPage>
    </>
  );
}

export default TestPage;
