import mongoose, { Schema, Document } from "mongoose";



export interface ISection {
  title: string;
  description?: string;
  type: "text" | "list";
  items?: string[];
}

export interface IProject extends Document {
  title: string;
  description: string;
  category: "best" | "mid";  // Add this line
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  projectImages: string[];
  sections: ISection[];
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema
const ProjectSchema = new Schema<IProject>(
  {
    category: {
      type: String,
      enum: ["best", "mid"],
      required: [true, "Project category is required"],
      default: "mid"
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters long"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    githubUrl: {
      type: String,
      validate: {
        validator: (value: string) => {
          if (!value) return true; // Allow empty for optional field
          return /^https?:\/\/(?:www\.)?github\.com\/[\w-]+\/[\w-]+/.test(value);
        },
        message: "Please provide a valid GitHub URL",
      },
    },
    liveUrl: {
      type: String,
      validate: {
        validator: (value: string) => {
          if (!value) return true; // Allow empty for optional field
          return /^https?:\/\//.test(value);
        },
        message: "Please provide a valid URL",
      },
    },
    technologies: [{
      type: String,
      required: true,
      validate: {
        validator: (value: string[]) => value.length > 0,
        message: "At least one technology is required",
      },
    }],
    projectImages: {
      type: [String], // Change this to array of strings
      required: true,
      validate: {
        validator: (values: string[]) => values.length > 0 && values.length <= 5,
        message: "Please select between 1 and 5 images"
      }
    },
    sections: [{
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Section title must be at least 2 characters long"],
      },
      description: {
        type: String,
        trim: true,
      },
      type: {
        type: String,
        enum: ["text", "list"],
        required: true,
      },
      items: [{
        type: String,
        trim: true,
      }],
    }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);






// Add static methods if needed
ProjectSchema.statics.findByTechnology = function(tech: string) {
  return this.find({ technologies: tech });
};
// Create and export the model
export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);