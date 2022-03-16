import React from 'react'
import './Banner.scss';
import image1 from '../../assets/images/banner/khamchuyenkhoa.png';
import image2 from '../../assets/images/banner/khamtuxa.png';
import image3 from '../../assets/images/banner/khamtongquat.png';
import image4 from '../../assets/images/banner/dichvuxetnghiem.png';
import image5 from '../../assets/images/banner/suckhoetinhthan.png';
import image6 from '../../assets/images/banner/khamchuyenkhoa.png';
import image7 from '../../assets/images/banner/goi-phau-thuat.png';
import image8 from '../../assets/images/banner/khamtainha.png';
import { FormattedMessage } from 'react-intl';
class Banner extends React.Component {
    state = {
        images: [
            {
                image: image1,
                caption: <FormattedMessage id="homeBanner.examination" />
            },
            {
                image: image2,
                caption: <FormattedMessage id="homeBanner.far-away" />
            },
            {
                image: image3,
                caption: <FormattedMessage id="homeBanner.general" />
            },
            {
                image: image4,
                caption: <FormattedMessage id="homeBanner.medical-test" />
            },
            {
                image: image5,
                caption: <FormattedMessage id="homeBanner.health" />
            },
            {
                image: image6,
                caption: <FormattedMessage id="homeBanner.clinic" />
            },
            {
                image: image7,
                caption: <FormattedMessage id="homeBanner.surgery-package" />
            },
            {
                image: image8,
                caption: <FormattedMessage id="homeBanner.medical" />
            },
        ]
    }
    render() {
        return (
            <>
                <div className="banner-container d-flex">
                    <div className="banner-first ">
                        <div className="title  text-center">
                            <p>NỀN TẢNG Y TẾ</p>
                            <p>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</p>
                        </div>
                        <div className="search text-center ">
                            <i className="fas fa-search"></i>
                            <input type="text" className="" placeholder="Tìm chuyên khoa" />
                        </div>
                    </div>
                    <div className="banner-second-bg">
                        <div className="banner-second d-flex">

                            {this.state.images && Object.keys(this.state.images).length > 0 &&
                                this.state.images.map((item, index) => {
                                    return (
                                        <div key={index + 1}>
                                            <div className="thumbnail"  >
                                                <div className="option">
                                                    <div className="img-thumbnail">
                                                        <img src={item.image} />
                                                    </div>
                                                </div>
                                                <div className="caption">
                                                    <p>{item.caption}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>




                </div>

            </>
        )
    }
}
export default Banner;