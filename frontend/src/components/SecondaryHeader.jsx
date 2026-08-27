import React from "react";

function SecondaryHeader(props) {
	return (
		<>
			<div className="sec_hdr">
				<div 
					className="secondary_header sec_bg d-flex justify-content-center align-items-center flex-column"
					data-aos="fade-in"
					data-aos-duration="1200"
				>
					<h2 
						className="hdrcolor" 
						data-aos="zoom-in" 
						data-aos-delay="300"
					>
						{props.sectitle}
					</h2>	
					<h5 
						className="text-white lead px-4 text-center" 
						data-aos="fade-up" 
						data-aos-delay="500"
					>
						{props.secdesc}
					</h5>
				</div>
			</div>
		</>
	);
};

export default SecondaryHeader;
