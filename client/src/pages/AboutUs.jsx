import React from "react";
import { Container } from "../import";

const AboutUs = () => {
    return (
        <div className="min-h-screen flex">
            <Container classes="flex flex-col mt-40 max-sm:my-20 lg:px-20 mb-20">
                <div className="my-4">
                    <div className="max-lg:flex">
                        <img
                            src="dummy.jpg"
                            alt="Dummy Image"
                            className="lg:float-left mx-auto my-auto rounded-lg lg:mr-4"
                        />
                    </div>
                    <div className="flex flex-col items-center h-full lg:justify-center">
                        <div className="text-justify">
                            <p className="about-us-title">Our Stroy</p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the 1960s with the release
                            of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions
                            of Lorem Ipsum.
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="max-lg:flex">
                        <img
                            src="dummy-1.jpg"
                            alt="Dummy Image"
                            className="lg:float-right mx-auto my-auto rounded-lg lg:ml-4"
                        />
                    </div>
                    <div className="flex flex-col items-center h-full lg:justify-center">
                        <div className="text-justify">
                            <p className="about-us-title">Our Vision</p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the 1960s with the release
                            of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions
                            of Lorem Ipsum.
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="max-lg:flex">
                        <img
                            src="dummy-2.jpg"
                            alt="Dummy Image"
                            className="lg:float-left mx-auto my-auto rounded-lg lg:mr-4"
                        />
                    </div>
                    <div className="flex flex-col items-center h-full lg:justify-center">
                        <div className="text-justify">
                            <p className="about-us-title">Our Mission</p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the 1960s with the release
                            of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions
                            of Lorem Ipsum.
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AboutUs;
