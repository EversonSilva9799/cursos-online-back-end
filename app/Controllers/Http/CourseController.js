'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Course = use('App/Models/Course')
const Category = use('App/Models/Category');
const Drive = use('Drive')


class CourseController {

  async index ({ request, response, view }) {

    const courses = Course.all()

    return courses
  }

  async store ({ request, response }) {

    const data = request.only([
      'name',
      'description'
    ]);

    const id_category = request.only([ 'category_id' ]).category_id


    //Buscando a categoria associada ao curso criado
    const category = await Category.findOrFail(id_category);

    const course = await Course.create({ ...data, category_id: id_category});

    //Somando mais um a quantidade de Cursos na categoria quando um curso for criado
    await Category
    .query()
    .where('id', id_category)
    .update({ qtd_courses: category.qtd_courses + 1})

    return course;

    //await Drive.put('hello.txt', Buffer.from('/teste'))
  }


  //Retorna um curso com seus vídeos associados
  async show ({ params }) {
    const course = await Course.findOrFail(params.id)
    await course.load('videos')

    return course
  }

  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = CourseController
