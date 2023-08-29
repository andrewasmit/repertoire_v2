# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_28_011637) do
  create_table "concerts", force: :cascade do |t|
    t.string "title"
    t.integer "year"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ensembles", force: :cascade do |t|
    t.integer "organization_id"
    t.string "name"
    t.string "grade_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.integer "piece_id"
    t.integer "user_id"
    t.string "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "performances", force: :cascade do |t|
    t.integer "piece_id"
    t.integer "ensemble_id"
    t.integer "concert_id"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pieces", force: :cascade do |t|
    t.string "title"
    t.string "composer"
    t.integer "number_of_players"
    t.string "genre"
    t.integer "difficulty"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email_address"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
