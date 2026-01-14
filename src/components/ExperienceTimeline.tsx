
import React from 'react';
import VerticalTimelineComponent from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experienceData } from '../data/experience';
import { FaBriefcase } from 'react-icons/fa';
import { timelineThemes, uiColors } from '../styles/colorTokens';

const { VerticalTimeline, VerticalTimelineElement } = VerticalTimelineComponent || {};

const ExperienceTimeline: React.FC = () => {
     return (
         <div className="mt-12 px-2 sm:px-4 md:px-0">
            <VerticalTimeline lineColor={uiColors.timeline.line}>
                {experienceData.map((item, index) => {
                    const theme = Object.values(timelineThemes)[index % Object.values(timelineThemes).length];
                    return (
                        <VerticalTimelineElement
                            key={index}
                            className="vertical-timeline-element--work"
                            contentStyle={{
                                padding: '0.75rem',
                                background: 'rgba(var(--color-bg-surface), 0.6)',
                                backdropFilter: 'blur(12px)',
                                border: `1px solid ${theme.primary}`,
                                borderLeft: `4px solid ${theme.primary}`,
                                boxShadow: `0 0 20px -5px ${theme.shadow}, inset 0 0 10px -5px ${theme.shadow}`, // Neon glow
                                borderRadius: '12px',
                                color: 'rgb(var(--color-text-base))',
                            }}
                            contentArrowStyle={{ borderRight: `7px solid ${theme.primary}` }}
                            date={item.date}
                            dateClassName="text-accent/90 font-bold mx-0 md:mx-4 !opacity-100 text-xs sm:text-sm md:text-base translation-y-1 drop-shadow-[0_0_5px_rgba(var(--color-primary),0.5)]"
                            iconStyle={{
                                background: theme.iconBg,
                                color: theme.primary,
                                boxShadow: `0 0 10px 2px ${theme.primary}60, inset 0 0 0 1px ${theme.primary}`, // Stronger icon glow
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '32px',
                                height: '32px',
                            }}
                            icon={<FaBriefcase className="text-sm md:text-base" />}
                        >
                            <div className="group cursor-pointer p-4 relative overflow-hidden transition-all duration-300">
                                {/* Decorative gradient background effect on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at center, ${theme.primary}, transparent 70%)` }}
                                ></div>

                                {/* Header Section */}
                                <div className="flex flex-col gap-1 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`vertical-timeline-element-title text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient} drop-shadow-sm leading-tight`}>
                                            {item.title}
                                        </h3>
                                        <span
                                            className="px-2 py-0.5 rounded-full text-[10px] font-medium border whitespace-nowrap"
                                            style={{
                                                backgroundColor: theme.shadow,
                                                color: theme.primary,
                                                borderColor: theme.primary
                                            }}
                                        >
                                            {item.location}
                                        </span>
                                    </div>

                                    <h4 className="text-sm font-semibold text-accent flex items-center gap-2">
                                        {item.company}
                                    </h4>
                                </div>

                                {/* Brief Summary */}
                                <p className="text-xs text-secondary/90 mt-2 leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all relative z-10">
                                    {item.description[0]}
                                </p>

                                {/* Expanded Details */}
                                <div className="max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden relative z-10">
                                    <ul className="space-y-2 mt-3 pt-3 border-t" style={{ borderColor: theme.shadow }}>
                                        {item.description.slice(1).map((desc, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-secondary leading-relaxed">
                                                <span
                                                    className="mt-1.5 min-w-[4px] h-1 rounded-full"
                                                    style={{ backgroundColor: theme.primary }}
                                                ></span>
                                                <span>{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>

            <style>{`
                .vertical-timeline::before {
                    background: rgba(255, 255, 255, 0.1) !important;
                    width: 2px !important;
                }
                @media only screen and (min-width: 1170px) {
                    .vertical-timeline.vertical-timeline--two-columns:before {
                        left: calc(50% - 13px) !important;
                    }
                }
                .vertical-timeline-element-icon svg {
                    left: 0% !important;
                    top: 0% !important;
                    margin-left: 0 !important;
                    margin-top: 0 !important;
                    transform: scale(0.8);
                }
                .vertical-timeline-element-date {
                    margin-top: 0px !important;
                    padding: 0px !important;
                    margin: 0px !important;
                    margin-right: 2rem !important;
                }
            `}</style>
        </div>
    );
};

export default ExperienceTimeline;
