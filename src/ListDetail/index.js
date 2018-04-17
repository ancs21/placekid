import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";
import "./index.css";

export default class ListDetail extends React.Component {
  render() {
    const datamarker = this.props.marker;
    return (
      <Card>
        <CardImg
          top
          width="100%"
          src="https://images.foody.vn/res/g16/155228/prof/s576x330/foody-mobile-hmb-m-jpg-635-635792103605028724.jpg"
          alt="Card image cap"
        />
        <CardBody>
          <div
            style={{
              position: "absolute",
              top: "23%",
              right: "2%"
            }}
          >
            <Button>Lưu</Button> <Button>Chỉ đường</Button>
          </div>
          <CardTitle>
            {datamarker.tenTruong !== "undefined" ? datamarker.tenTruong : null}
          </CardTitle>
          <CardText>
            <strong>Địa chỉ: </strong>
            {datamarker.diaChi !== "undefined"
              ? datamarker.fullAddressByHand
              : null}
          </CardText>
          <CardText>
            <strong>Sô điện thoại: </strong>
            {datamarker.phone !== "undefined" ? datamarker.phone : null}
          </CardText>
          <CardText>
            <strong>Website: </strong>
            {datamarker.website !== "undefined" ? datamarker.website : null}
          </CardText>
          <CardText>
            <strong>Loại trường: </strong>
            {datamarker.loaiTruong !== "undefined"
              ? datamarker.loaiTruong
              : null}
          </CardText>
          <CardText>
            <strong>Giấy chứng nhận: </strong>
            {datamarker.giayChungNhan !== "undefined"
              ? datamarker.giayChungNhan
              : null}
          </CardText>
          <CardText>
            <strong>Cơ sở vật chất: </strong>
            {datamarker.coSoVatChat !== "undefined"
              ? datamarker.coSoVatChat
              : null}
          </CardText>
          <CardText>
            <strong>Nhân lực: </strong>
            {datamarker.nhanLuc !== "undefined" ? datamarker.nhanLuc : null}
          </CardText>
          <CardText>
            <strong>Chương trình dạy: </strong>{" "}
            {datamarker.chuongTrinhGiangDay !== "undefined"
              ? datamarker.chuongTrinhGiangDay
              : null}
          </CardText>
          <CardText>
            <strong>Học phí: </strong>
            {datamarker.hocPhi !== "undefined" ? datamarker.hocPhi : null}
          </CardText>
          <CardText>
            <strong>Độ tuổi trẻ nhận giữ: </strong>
            {datamarker.doTuoiNhan !== "undefined"
              ? datamarker.doTuoiNhan
              : null}
          </CardText>
          <CardText>
            <strong>Thời gian nhận giữ trẻ: </strong>
            {datamarker.thoiGianGiu !== "undefined"
              ? datamarker.thoiGianGiu
              : null}
          </CardText>
          <CardText>
            <strong>Khác: </strong>
            {datamarker.khac !== "undefined" ? datamarker.khac : null}
          </CardText>

          {datamarker.loaiTruong !== "undefined" ? (
            datamarker.loaiTruong === "Dân Lập" ? (
              <Button style={{ marginBottom: 30 }} outline color="info">
                Nhận tuyển sinh theo nhu cầu
              </Button>
            ) : (
              <Button style={{ marginBottom: 30 }} outline color="info">
                Nhận tuyển sinh{" "}
                {datamarker.phuong !== "undefined" ? datamarker.phuong : null}{" "}
                và các phường lân cận
              </Button>
            )
          ) : (
            <Button style={{ marginBottom: 30 }} outline color="info">
              Nhận tuyển sinh{" "}
              {datamarker.phuong !== "undefined" ? datamarker.phuong : null} và
              các phường lân cận
            </Button>
          )}

          {/* <Button style={{ marginBottom: 30 }} outline color="info">
            Nhận tuyển sinh{" "}
            {datamarker.phuong !== "undefined" ? datamarker.phuong : null} và
            các phường lân cận
          </Button> */}
        </CardBody>
      </Card>
    );
  }
}
