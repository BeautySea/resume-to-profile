import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "OPENAI_API_KEY",
  organization: "OPENAI_ORGANIZATION_ID",
});

async function processResume(file: string) {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "user",
      content: `extract the needed information from the following resume: ${file} the current year is 2024`,
      // content: `Extract the needed information from the following resume: ${file}, Here are the key things to note in performing the extraction:
      // - The current year is ${new Date().getFullYear()}
      // - Pay attention especially to the skills and the years of experience of those skills
      // - Also try hard to deduce the proficiency level of those skills on a scale of 0 to 1. For example '0.30', 0.99, etc.`,
    },
  ];
  const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
    {
      type: "function",
      function: {
        name: "personal_details",
        description: "Get the personal details of a person",
        parameters: {
          $defs: {
            Certification: {
              properties: {
                name: { title: "Name", type: "string" },
                issuing_organization: {
                  title: "Issuing Organization",
                  type: "string",
                },
                issue_date: {
                  format: "date",
                  title: "Issue Date",
                  type: "string",
                },
                expiry_date: {
                  anyOf: [{ format: "date", type: "string" }, { type: "null" }],
                  title: "Expiry Date",
                },
              },
              required: [
                "name",
                "issuing_organization",
                "issue_date",
                "expiry_date",
              ],
              title: "Certification",
              type: "object",
            },
            Education: {
              properties: {
                institution: { title: "Institution", type: "string" },
                degree: { title: "Degree", type: "string" },
                field_of_study: { title: "Field Of Study", type: "string" },
                start_date: {
                  format: "date",
                  title: "Start Date",
                  type: "string",
                },
                end_date: {
                  anyOf: [{ format: "date", type: "string" }, { type: "null" }],
                  title: "End Date",
                },
                gpa: {
                  anyOf: [{ type: "number" }, { type: "null" }],
                  title: "Gpa",
                },
              },
              required: [
                "institution",
                "degree",
                "field_of_study",
                "start_date",
                "end_date",
                "gpa",
              ],
              title: "Education",
              type: "object",
            },
            PersonalInfo: {
              properties: {
                full_name: { title: "Full Name", type: "string" },
                email: { format: "email", title: "Email", type: "string" },
                phone: {
                  anyOf: [{ type: "string" }, { type: "null" }],
                  title: "Phone",
                },
                address: {
                  anyOf: [{ type: "string" }, { type: "null" }],
                  title: "Address",
                },
                linkedin: {
                  anyOf: [{ type: "string" }, { type: "null" }],
                  title: "Linkedin",
                },
                personal_website: {
                  anyOf: [{ type: "string" }, { type: "null" }],
                  title: "Personal Website",
                },
              },
              required: [
                "full_name",
                "email",
                "phone",
                "address",
                "linkedin",
                "personal_website",
              ],
              title: "PersonalInfo",
              type: "object",
            },
            Reference: {
              properties: {
                full_name: { title: "Full Name", type: "string" },
                relationship: { title: "Relationship", type: "string" },
                company: {
                  anyOf: [{ type: "string" }, { type: "null" }],
                  title: "Company",
                },
                phone: {
                  anyOf: [{ type: "string" }, { type: "null" }],
                  title: "Phone",
                },
                email: { format: "email", title: "Email", type: "string" },
              },
              required: [
                "full_name",
                "relationship",
                "company",
                "phone",
                "email",
              ],
              title: "Reference",
              type: "object",
            },
            Skill: {
              properties: {
                name: {
                  title:
                    "List of various skills infered from the job descriptions, for example AWS Identity and Access Management, Risk Assessment, Cloud Security",
                  type: "string",
                },
                proficiency_level: {
                  anyOf: [{ type: "string" }, { type: "null" }],
                  title: "Proficiency Level",
                },
                years_of_experience: {
                  anyOf: [{ type: "integer" }, { type: "null" }],
                  title:
                    "Calculated Years of experience in this skill, using the start and end date of the work experience in years",
                },
              },
              required: ["name", "proficiency_level", "years_of_experience"],
              title: "Skill",
              type: "object",
            },
            WorkExperience: {
              properties: {
                company: { title: "Company", type: "string" },
                position: { title: "Position", type: "string" },
                start_date: {
                  format: "date",
                  title: "Start Date",
                  type: "string",
                },
                end_date: {
                  anyOf: [{ format: "date", type: "string" }, { type: "null" }],
                  title: "End Date",
                },
                responsibilities: {
                  items: { type: "string" },
                  title: "Responsibilities",
                  type: "array",
                },
              },
              required: [
                "company",
                "position",
                "start_date",
                "end_date",
                "responsibilities",
              ],
              title: "WorkExperience",
              type: "object",
            },
          },
          properties: {
            personal_info: { $ref: "#/$defs/PersonalInfo" },
            education: {
              items: { $ref: "#/$defs/Education" },
              title: "Education",
              type: "array",
            },
            work_experience: {
              items: { $ref: "#/$defs/WorkExperience" },
              title: "Work Experience",
              type: "array",
            },
            skills: {
              items: { $ref: "#/$defs/Skill" },
              title: "Skills",
              type: "array",
            },
            certifications: {
              anyOf: [
                { items: { $ref: "#/$defs/Certification" }, type: "array" },
                { type: "null" },
              ],
              title: "Certifications",
            },
            references: {
              anyOf: [
                { items: { $ref: "#/$defs/Reference" }, type: "array" },
                { type: "null" },
              ],
              title: "References",
            },
          },
          required: [
            "personal_info",
            "education",
            "work_experience",
            "skills",
            "certifications",
            "references",
          ],
          type: "object",
        },
      },
    },
  ];
  // const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  //   {
  //     type: "function",
  //     function: {
  //       name: "personal_details",
  //       description: "Get the personal details of a person",
  //       parameters: {
  //         $defs: {
  //           Certification: {
  //             properties: {
  //               name: { title: "Name", type: "string" },
  //               issuing_organization: {
  //                 title: "Issuing Organization",
  //                 type: "string",
  //               },
  //               issue_date: {
  //                 format: "date",
  //                 title: "Issue Date",
  //                 type: "string",
  //               },
  //               expiry_date: {
  //                 anyOf: [{ format: "date", type: "string" }, { type: "null" }],
  //                 title: "Expiry Date",
  //               },
  //             },
  //             required: [
  //               "name",
  //               "issuing_organization",
  //               "issue_date",
  //               "expiry_date",
  //             ],
  //             title: "Certification",
  //             type: "object",
  //           },
  //           Education: {
  //             properties: {
  //               institution: { title: "Institution", type: "string" },
  //               degree: { title: "Degree", type: "string" },
  //               field_of_study: { title: "Field Of Study", type: "string" },
  //               start_date: {
  //                 format: "date",
  //                 title: "Start Date",
  //                 type: "string",
  //               },
  //               end_date: {
  //                 anyOf: [{ format: "date", type: "string" }, { type: "null" }],
  //                 title: "End Date",
  //               },
  //               gpa: {
  //                 anyOf: [{ type: "number" }, { type: "null" }],
  //                 title: "Gpa",
  //               },
  //             },
  //             required: [
  //               "institution",
  //               "degree",
  //               "field_of_study",
  //               "start_date",
  //               "end_date",
  //               "gpa",
  //             ],
  //             title: "Education",
  //             type: "object",
  //           },
  //           PersonalInfo: {
  //             properties: {
  //               full_name: { title: "Full Name", type: "string" },
  //               email: { format: "email", title: "Email", type: "string" },
  //               phone: {
  //                 anyOf: [{ type: "string" }, { type: "null" }],
  //                 title: "Phone",
  //               },
  //               address: {
  //                 anyOf: [{ type: "string" }, { type: "null" }],
  //                 title: "Address",
  //               },
  //               linkedin: {
  //                 anyOf: [{ type: "string" }, { type: "null" }],
  //                 title: "Linkedin",
  //               },
  //               personal_website: {
  //                 anyOf: [{ type: "string" }, { type: "null" }],
  //                 title: "Personal Website",
  //               },
  //             },
  //             required: [
  //               "full_name",
  //               "email",
  //               "phone",
  //               "address",
  //               "linkedin",
  //               "personal_website",
  //             ],
  //             title: "PersonalInfo",
  //             type: "object",
  //           },
  //           Reference: {
  //             properties: {
  //               full_name: { title: "Full Name", type: "string" },
  //               relationship: { title: "Relationship", type: "string" },
  //               company: {
  //                 anyOf: [{ type: "string" }, { type: "null" }],
  //                 title: "Company",
  //               },
  //               phone: {
  //                 anyOf: [{ type: "string" }, { type: "null" }],
  //                 title: "Phone",
  //               },
  //               email: { format: "email", title: "Email", type: "string" },
  //             },
  //             required: [
  //               "full_name",
  //               "relationship",
  //               "company",
  //               "phone",
  //               "email",
  //             ],
  //             title: "Reference",
  //             type: "object",
  //           },
  //           Skill: {
  //             properties: {
  //               name: {
  //                 title: "Skill name inferred from previous jobs",
  //                 type: "string",
  //               },
  //               proficiency_level: {
  //                 anyOf: [{ type: "string" }, { type: "null" }],
  //                 title: "Proficiency Level",
  //               },
  //               years_of_experience: {
  //                 anyOf: [{ type: "integer" }, { type: "null" }],
  //                 title: "Calculated Years of experience in this skill",
  //               },
  //             },
  //             required: ["name", "proficiency_level", "years_of_experience"],
  //             title: "Skill",
  //             type: "object",
  //           },
  //           WorkExperience: {
  //             properties: {
  //               company: { title: "Company", type: "string" },
  //               position: { title: "Position", type: "string" },
  //               start_date: {
  //                 format: "date",
  //                 title: "Start Date",
  //                 type: "string",
  //               },
  //               end_date: {
  //                 anyOf: [{ format: "date", type: "string" }, { type: "null" }],
  //                 title: "End Date",
  //               },
  //               responsibilities: {
  //                 items: { type: "string" },
  //                 title: "Responsibilities",
  //                 type: "array",
  //               },
  //             },
  //             required: [
  //               "company",
  //               "position",
  //               "start_date",
  //               "end_date",
  //               "responsibilities",
  //             ],
  //             title: "WorkExperience",
  //             type: "object",
  //           },
  //         },
  //         properties: {
  //           personal_info: { $ref: "#/$defs/PersonalInfo" },
  //           education: {
  //             items: { $ref: "#/$defs/Education" },
  //             title: "Education",
  //             type: "array",
  //           },
  //           work_experience: {
  //             items: { $ref: "#/$defs/WorkExperience" },
  //             title: "Work Experience",
  //             type: "array",
  //           },
  //           skills: {
  //             items: { $ref: "#/$defs/Skill" },
  //             title: "Skills",
  //             type: "array",
  //           },
  //           certifications: {
  //             anyOf: [
  //               { items: { $ref: "#/$defs/Certification" }, type: "array" },
  //               { type: "null" },
  //             ],
  //             title: "Certifications",
  //           },
  //           references: {
  //             anyOf: [
  //               { items: { $ref: "#/$defs/Reference" }, type: "array" },
  //               { type: "null" },
  //             ],
  //             title: "References",
  //           },
  //         },
  //         required: [
  //           "personal_info",
  //           "education",
  //           "work_experience",
  //           "skills",
  //           "certifications",
  //           "references",
  //         ],
  //         type: "object",
  //       },
  //     },
  //   },
  // ];
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages,
    tools,
    tool_choice: "auto",
  });

  const response_message = response.choices[0].message;
  const tool_calls = response_message.tool_calls![0];
  const function_args = JSON.parse(tool_calls.function.arguments);

  return function_args;
}

export { processResume };
